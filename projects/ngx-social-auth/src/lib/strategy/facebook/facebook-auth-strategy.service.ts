import {Inject, Injectable} from '@angular/core';
import {FACEBOOK_AUTH_CONFIG} from './facebook-auth-config.token';
import {SocialAuthStrategy} from '../social-auth-strategy';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {catchError, map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {NgxSocialAuthResponse} from '../../social-auth-response';
import {FacebookAuthConfig, FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions} from './facebook';

/**
 * Implements authentication by Facebook v9.0
 *
 * @see https://developers.facebook.com/docs/javascript
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class FacebookAuthStrategyService implements
  SocialAuthStrategy<FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions> {

  /**
   * An behaviour subject that emits 'true' when facebook instance is ready, otherwise 'false'
   */
  private facebookInstanceReady$: BehaviorSubject<boolean> | null = null;

  private readonly apiHost = 'https://connect.facebook.net';

  private readonly apiResource = 'sdk.js';

  private get apiLang(): string {
    return this.config.lang ? this.config.lang : 'en_US';
  }

  private get apiSource(): string {
    return `${this.apiHost}/${this.apiLang}/${this.apiResource}`;
  }

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilService,
              @Inject(FACEBOOK_AUTH_CONFIG) private readonly config: FacebookAuthConfig) {
  }

  isSupport(type: NgxSocialAuthProviderType): boolean {
    return type === NgxSocialAuthProviderType.Facebook;
  }

  singIn(options?: FacebookAuthSignInOptions): Observable<NgxSocialAuthResponse> {
    return this.onFacebookInstanceReady().pipe(
      switchMap(() => this.callFunction('login', options)),
      switchMap(this.fromAuthResponse.bind(this)),
      map(credentials => ({providerResponse: credentials}))
    );
  }

  signOut(): Observable<void> {
    return this.onFacebookInstanceReady().pipe(
      switchMap(() => this.callFunction('logout'))
    );
  }

  getState(options?: FacebookAuthStateOptions): Observable<NgxSocialAuthResponse> {
    return this.onFacebookInstanceReady().pipe(
      switchMap(() => this.callFunction('status', options)),
      switchMap(this.fromAuthResponse.bind(this)),
      map(credentials => ({providerResponse: credentials}))
    );
  }


  /**
   * Emits credentials from auth response if user is authenticated, otherwise throw error
   */
  private fromAuthResponse(response: any): Observable<any> {
    const authResponse = response.authResponse;

    if (response.status !== 'connected' || !authResponse) {
      return throwError('Facebook user is not authorized');
    }

    return of(authResponse);
  }

  /**
   * Call 'FB' function with specific options
   */
  private callFunction(functionType: 'login' | 'logout' | 'status', options?: any): Observable<any> {
    const loaded$ = new Subject<any>();

    const callback = (response?: any) => {
      loaded$.next(response);
      loaded$.complete();
    };

    switch (functionType) {
      case 'login':
        FB.login(callback, options);
        break;
      case 'logout':
        FB.logout(callback, options);
        break;
      case 'status':
        FB.getLoginStatus(callback, options);
        break;
      default:
        callback();
    }

    return loaded$.asObservable();
  }


  /**
   * Emits next when facebook instance is ready, then completes
   */
  private onFacebookInstanceReady(): Observable<any> {
    if (this.facebookInstanceReady$) {
      return this.facebookInstanceReady$.asObservable().pipe(
        skipWhile(isReady => !isReady),
        take(1)
      );
    }

    this.facebookInstanceReady$ = new BehaviorSubject<boolean>(false);

    return this.loadFacebookInstance().pipe(
      tap(this.handleFacebookInstanceReady.bind(this)),
      catchError(this.handleFacebookInstanceError.bind(this))
    );
  }

  private handleFacebookInstanceReady(): void {
    if (!this.facebookInstanceReady$) {
      return;
    }

    this.facebookInstanceReady$.next(true);
  }

  private handleFacebookInstanceError(error: any): Observable<never> {
    if (this.facebookInstanceReady$) {
      this.facebookInstanceReady$.error(error);
    }

    return throwError(error);
  }

  private loadFacebookInstance(): Observable<Event> {
    return this.socialAuthUtilsService.loadScript({src: this.apiSource, async: true, defer: true}, 'body').pipe(
      tap(() => FB.init(this.config))
    );
  }
}

