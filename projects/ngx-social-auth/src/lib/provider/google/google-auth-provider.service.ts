import {Inject, Injectable, OnDestroy} from '@angular/core';
import {SocialAuthProvider} from '../social-auth-provider';
import {GOOGLE_AUTH_CONFIG} from './google-auth-config.key';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, first, map, mergeMap, skipWhile, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {SocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {SocialAuthResponse} from '../../social-auth-response';
import {SocialAuthUtilsService} from '../../core/social-auth-utils.service';
import {GoogleAuthConfig, GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions} from './google-auth';

/**
 * Implements authentication by Google
 *
 * @see https://developers.google.com/identity/sign-in/web/reference
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class GoogleAuthProviderService implements
  SocialAuthProvider<GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions>, OnDestroy {

  readonly type = SocialAuthProviderType.Google;

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

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilsService,
              @Inject(GOOGLE_AUTH_CONFIG) private readonly googleAuthConfig: GoogleAuthConfig) {
  }

  ngOnDestroy(): void {
    if (this.googleAuth$) {
      this.googleAuth$.complete();
    }
  }

  singIn(options?: GoogleAuthSignInOptions): Observable<SocialAuthResponse> {
    const includeAuthorizationData = options ? options.includeAuthorizationData : undefined;

    return this.getGoogleAuth().pipe(
      switchMap(googleAuth => fromPromise(googleAuth.signIn(options))),
      map<any, SocialAuthResponse>(googleUser => this.fromGoogleUser(googleUser, includeAuthorizationData))
    );
  }

  signOut(): Observable<void> {
    return this.getGoogleAuth().pipe(
      switchMap((googleAuth) => fromPromise<void>(googleAuth.signOut()))
    );
  }

  getState(options?: GoogleAuthStateOptions): Observable<SocialAuthResponse> {
    return this.getGoogleAuth().pipe(
      switchMap(googleAuth => of(googleAuth.currentUser.get())),
      map<any, SocialAuthResponse>(googleUser => this.fromGoogleUser(googleUser, options))
    );
  }

  /**
   * Returns generic auth response object based on google user
   */
  private fromGoogleUser(googleUser: any, includeAuthorizationData?: boolean): SocialAuthResponse {
    const credentials = googleUser.getAuthResponse(includeAuthorizationData);

    return {credentials};
  }

  private getGoogleAuth(): Observable<any> {
    if (this.googleAuth$) {
      return this.googleAuth$.asObservable().pipe(
        skipWhile(googleAuth => !googleAuth),
        first()
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
        mergeMap(() => this.loadAuthApi(gapi)),
        mergeMap(auth2 => this.initAuthApi(auth2))
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
