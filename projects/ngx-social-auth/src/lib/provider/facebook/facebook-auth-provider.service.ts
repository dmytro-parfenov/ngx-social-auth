import {Inject, Injectable} from '@angular/core';
import {FACEBOOK_AUTH_CONFIG} from './facebook-auth-config.key';
import {SocialAuthProvider} from '../social-auth-provider';
import {SocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {SocialAuthUtilsService} from '../../core/social-auth-utils.service';
import {catchError, first, map, mergeMap, skipWhile, tap} from 'rxjs/operators';
import {FacebookAuthConfig, FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions} from './facebook-auth';
import {SocialAuthResponse} from '../../social-auth-response';

/**
 * Implements authentication by Facebook v9.0
 *
 * @see https://developers.facebook.com/docs/javascript
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class FacebookAuthProviderService implements
  SocialAuthProvider<FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions> {

  readonly type = SocialAuthProviderType.Facebook;

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

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilsService,
              @Inject(FACEBOOK_AUTH_CONFIG) private readonly config: FacebookAuthConfig) {
  }

  singIn(options?: FacebookAuthSignInOptions): Observable<SocialAuthResponse> {
    return this.onFacebookInstanceReady().pipe(
      mergeMap(() => this.callFunction('login', options)),
      mergeMap(this.fromAuthResponse.bind(this)),
      map(credentials => ({credentials}))
    );
  }

  signOut(): Observable<void> {
    return this.onFacebookInstanceReady().pipe(
      mergeMap(() => this.callFunction('logout'))
    );
  }

  getState(options?: FacebookAuthStateOptions): Observable<SocialAuthResponse> {
    return this.onFacebookInstanceReady().pipe(
      mergeMap(() => this.callFunction('status', options)),
      mergeMap(this.fromAuthResponse.bind(this)),
      map(credentials => ({credentials}))
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
        mergeMap(() => of(null)),
        first(),
      );
    }

    this.facebookInstanceReady$ = new BehaviorSubject<boolean>(false);

    return this.loadFacebookInstance().pipe(
      tap(this.handleFacebookInstanceReady.bind(this)),
      mergeMap(() => of(null)),
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

