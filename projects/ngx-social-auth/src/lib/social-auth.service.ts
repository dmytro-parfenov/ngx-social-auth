import {Inject, Injectable} from '@angular/core';
import {SOCIAL_AUTH_STRATEGIES} from './strategy/social-auth-strategies.token';
import {SocialAuthStrategy} from './strategy/social-auth-strategy';
import {NgxSocialAuthProviderType} from './social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from './auth-response/social-auth-response';
import {Observable, throwError} from 'rxjs';
import {GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions} from './strategy/google/google';
import {FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions} from './strategy/facebook/facebook';
import {MicrosoftAuthSignInOptions, MicrosoftAuthStateOptions, MicrosoftAutSignOutOptions} from './strategy/microsoft/microsoft';

/**
 * Allows to authenticate the user by using all configured providers in {@link NgxSocialAuthModule.forRoot}
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable({
  providedIn: 'root'
})
export class NgxSocialAuthService {

  constructor(@Inject(SOCIAL_AUTH_STRATEGIES) private readonly socialAuthStrategies: SocialAuthStrategy[]) { }

  signIn(providerType: NgxSocialAuthProviderType.Google, options?: GoogleAuthSignInOptions): Observable<NgxSocialAuthResponse>;
  signIn(providerType: NgxSocialAuthProviderType.Facebook, options?: FacebookAuthSignInOptions): Observable<NgxSocialAuthResponse>;
  signIn(providerType: NgxSocialAuthProviderType.Microsoft, options?: MicrosoftAuthSignInOptions): Observable<NgxSocialAuthResponse>;
  signIn(providerType: NgxSocialAuthProviderType, options?: any): Observable<NgxSocialAuthResponse>;
  /**
   * Signs in the user
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType]
   */
  signIn(providerType: NgxSocialAuthProviderType, options?: any): Observable<NgxSocialAuthResponse> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.singIn(options) : this.throwUndefinedProviderError(providerType);
  }


  signOut(providerType: NgxSocialAuthProviderType.Google, options?: GoogleAuthSignOutOptions): Observable<void>;
  signOut(providerType: NgxSocialAuthProviderType.Facebook, options?: FacebookAuthSignOutOptions): Observable<void>;
  signOut(providerType: NgxSocialAuthProviderType.Microsoft, options?: MicrosoftAutSignOutOptions): Observable<void>;
  signOut(providerType: NgxSocialAuthProviderType, options?: any): Observable<void>;
  /**
   * Signs out the current account from the application
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   */
  signOut(providerType: NgxSocialAuthProviderType, options?: any): Observable<void> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.signOut(options) : this.throwUndefinedProviderError(providerType);
  }

  getState(providerType: NgxSocialAuthProviderType.Google, options?: GoogleAuthStateOptions): Observable<NgxSocialAuthResponse>;
  getState(providerType: NgxSocialAuthProviderType.Facebook, options?: FacebookAuthStateOptions): Observable<NgxSocialAuthResponse>;
  getState(providerType: NgxSocialAuthProviderType.Microsoft, options?: MicrosoftAuthStateOptions): Observable<NgxSocialAuthResponse>;
  getState(providerType: NgxSocialAuthProviderType, options?: any): Observable<NgxSocialAuthResponse>;
  /**
   * Get current auth state
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType] if the user is authenticated, otherwise 'null'
   */
  getState(providerType: NgxSocialAuthProviderType, options?: any): Observable<NgxSocialAuthResponse> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.getState(options) : this.throwUndefinedProviderError(providerType);
  }

  private findStrategy(providerType: NgxSocialAuthProviderType): SocialAuthStrategy | undefined {
    return this.socialAuthStrategies.find(strategy => strategy.isSupport(providerType));
  }

  private throwUndefinedProviderError(providerType: NgxSocialAuthProviderType): Observable<never> {
    return throwError(`Provider type is not defined. Type '${NgxSocialAuthProviderType[providerType]}.'`);
  }
}
