import {Inject, Injectable, OnDestroy} from '@angular/core';
import {SocialAuthStrategy} from '../social-auth-strategy';
import {GOOGLE_AUTH_CONFIG} from './google-auth-config.token';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from '../../social-auth-response';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {GoogleAuthConfig, GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions} from './google';

/**
 * Implements authentication by Google
 *
 * @see https://developers.google.com/identity/sign-in/web/reference
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class GoogleAuthStrategyService implements
  SocialAuthStrategy<GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions>, OnDestroy {

  /**
   * A behaviour subject that emits google auth instance
   */
  private googleAuth$: BehaviorSubject<any> | null = null;

  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#auth_setup
   */
  private readonly APIUrl = 'https://apis.google.com/js/platform.js';

  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#auth_setup
   */
  private readonly APIName = 'auth2';

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilService,
              @Inject(GOOGLE_AUTH_CONFIG) private readonly googleAuthConfig: GoogleAuthConfig) {
  }

  ngOnDestroy(): void {
    if (this.googleAuth$) {
      this.googleAuth$.complete();
    }
  }

  isSupport(type: NgxSocialAuthProviderType): boolean {
    return type === NgxSocialAuthProviderType.Google;
  }

  singIn(options?: GoogleAuthSignInOptions): Observable<NgxSocialAuthResponse> {
    const includeAuthorizationData = options ? options.includeAuthorizationData : undefined;

    return this.getGoogleAuth().pipe(
      switchMap(googleAuth => fromPromise(googleAuth.signIn(options))),
      switchMap(googleUser => this.fromGoogleUser(googleUser, includeAuthorizationData))
    );
  }

  signOut(): Observable<void> {
    return this.getGoogleAuth().pipe(
      switchMap((googleAuth) => fromPromise<void>(googleAuth.signOut()))
    );
  }

  getState(options?: GoogleAuthStateOptions): Observable<NgxSocialAuthResponse> {
    return this.getGoogleAuth().pipe(
      switchMap(googleAuth => of(googleAuth.currentUser.get())),
      switchMap(googleUser => this.fromGoogleUser(googleUser, options))
    );
  }

  /**
   * Returns generic auth response object based on google user
   */
  private fromGoogleUser(googleUser: any, includeAuthorizationData?: boolean): Observable<NgxSocialAuthResponse> {
    const credentials = googleUser.getAuthResponse(includeAuthorizationData);

    if (this.isValidCredentials(credentials)) {
      return of<NgxSocialAuthResponse>({providerResponse: credentials});
    }

    return throwError('Google user is not authorized');
  }

  private isValidCredentials(credentials: any): boolean {
    try {
      return Object.keys(credentials).length > 0;
    } catch (e) {
      return false;
    }
  }

  private getGoogleAuth(): Observable<any> {
    if (this.googleAuth$) {
      return this.googleAuth$.asObservable().pipe(
        skipWhile(googleAuth => !googleAuth),
        take(1)
      );
    }

    this.googleAuth$ = new BehaviorSubject(null);

    return this.loadAuthInstance().pipe(
      tap(this.handleGoogleAuth.bind(this)),
      catchError(this.handleGoogleAuthError.bind(this))
    );
  }

  private handleGoogleAuth(googleAuth: any): void {
    if (!this.googleAuth$) {
      return;
    }

    this.googleAuth$.next(googleAuth);
  }

  private handleGoogleAuthError(error: any): Observable<never> {
    if (this.googleAuth$) {
      this.googleAuth$.error(error);
    }

    return throwError(error);
  }

  private loadAuthInstance(): Observable<any> {
    return this.socialAuthUtilsService.loadScript({src: this.APIUrl, async: true, defer: true}, 'body')
      .pipe(
        switchMap(() => this.loadAuthApi(gapi)),
        switchMap(auth2 => this.initAuthApi(auth2))
      );
  }

  private initAuthApi(auth2: any): Observable<any> {
    return fromPromise(auth2.init(this.googleAuthConfig));
  }

  private loadAuthApi(gapi: any): Observable<any> {
    const loaded$ = new Subject<any>();

    gapi.load(this.APIName, () => {
      loaded$.next(gapi.auth2);
      loaded$.complete();
    });

    return loaded$.asObservable();
  }
}
