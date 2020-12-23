import {Inject, Injectable, OnDestroy} from '@angular/core';
import {SocialAuthStrategy} from '../social-auth-strategy';
import {GOOGLE_AUTH_CONFIG} from './google-auth-config.token';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from '../../auth-response/social-auth-response';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {DOCUMENT} from '@angular/common';
import {NgxSocialAuthConfigMap} from '../../provider/social-auth-config-map';
import {SignInOptionsMap} from '../options-map/sign-in-options-map';
import {StateOptionsMap} from '../options-map/state-options-map';

/**
 * Implements authentication by Google
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 *
 * @dynamic
 * @see https://angular.io/guide/angular-compiler-options#strictmetadataemit
 */
@Injectable()
export class GoogleAuthStrategyService implements
  SocialAuthStrategy<NgxSocialAuthProviderType.Google>, OnDestroy {

  /**
   * A behaviour subject that emits google auth instance
   */
  private googleAuth$$: BehaviorSubject<any> | null = null;

  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#auth_setup
   */
  private readonly APIUrl = 'https://apis.google.com/js/platform.js';

  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#auth_setup
   */
  private readonly APIName = 'auth2';

  /**
   * An instance of Google API
   */
  private get gapi(): any {
    return this.document.defaultView?.gapi;
  }

  constructor(private readonly socialAuthUtilService: SocialAuthUtilService,
              @Inject(GOOGLE_AUTH_CONFIG) private readonly googleAuthConfig: NgxSocialAuthConfigMap[NgxSocialAuthProviderType.Google],
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  ngOnDestroy(): void {
    if (this.googleAuth$$) {
      this.googleAuth$$.complete();
    }
  }

  isSupport(type: NgxSocialAuthProviderType): boolean {
    return type === NgxSocialAuthProviderType.Google;
  }

  // tslint:disable-next-line:max-line-length
  singIn(options?: SignInOptionsMap[NgxSocialAuthProviderType.Google]): Observable<NgxSocialAuthResponse<NgxSocialAuthProviderType.Google>> {
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

  // tslint:disable-next-line:max-line-length
  getState(options?: StateOptionsMap[NgxSocialAuthProviderType.Google]): Observable<NgxSocialAuthResponse<NgxSocialAuthProviderType.Google>> {
    return this.getGoogleAuth().pipe(
      switchMap(googleAuth => of(googleAuth.currentUser.get())),
      switchMap(googleUser => this.fromGoogleUser(googleUser, options))
    );
  }

  /**
   * Returns generic auth response object based on google user
   */
  // tslint:disable-next-line:max-line-length
  private fromGoogleUser(googleUser: any, includeAuthorizationData?: boolean): Observable<NgxSocialAuthResponse<NgxSocialAuthProviderType.Google>> {
    const providerResponse = googleUser.getAuthResponse(includeAuthorizationData);

    if (this.isValidProviderResponse(providerResponse)) {
      return of({providerResponse});
    }

    return throwError('Google user is not authorized');
  }

  private isValidProviderResponse(providerResponse: any): boolean {
    try {
      return Object.keys(providerResponse).length > 0;
    } catch (e) {
      return false;
    }
  }

  private getGoogleAuth(): Observable<any> {
    if (this.googleAuth$$) {
      return this.googleAuth$$.asObservable().pipe(
        skipWhile(googleAuth => !googleAuth),
        take(1)
      );
    }

    this.googleAuth$$ = new BehaviorSubject(null);

    return this.loadAuthInstance().pipe(
      tap(this.handleGoogleAuth.bind(this)),
      catchError(this.handleGoogleAuthError.bind(this))
    );
  }

  private handleGoogleAuth(googleAuth: any): void {
    if (!this.googleAuth$$) {
      return;
    }

    this.googleAuth$$.next(googleAuth);
  }

  private handleGoogleAuthError(error: any): Observable<never> {
    if (this.googleAuth$$) {
      this.googleAuth$$.error(error);
    }

    return throwError(error);
  }

  private loadAuthInstance(): Observable<any> {
    return this.socialAuthUtilService.loadScript({src: this.APIUrl, async: true, defer: true}, 'body')
      .pipe(
        switchMap(this.handleGapiLoading.bind(this)),
        switchMap(auth2 => this.initAuthApi(auth2))
      );
  }

  private handleGapiLoading(): Observable<any> {
    if (this.gapi) {
      return this.loadAuthApi(this.gapi);
    }

    return throwError(`'gapi' is not loaded`);
  }

  private initAuthApi(auth2: any): Observable<any> {
    return fromPromise(auth2.init(this.googleAuthConfig));
  }

  private loadAuthApi(gapi: any): Observable<any> {
    const loaded$$ = new Subject<any>();

    gapi.load(this.APIName, () => {
      loaded$$.next(gapi[this.APIName]);
      loaded$$.complete();
    });

    return loaded$$.asObservable();
  }
}
