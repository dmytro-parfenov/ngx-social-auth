import {Inject, Injectable} from '@angular/core';
import {SOCIAL_AUTH_STRATEGIES} from './strategy/social-auth-strategies.token';
import {SocialAuthStrategy} from './strategy/social-auth-strategy';
import {NgxSocialAuthProviderType} from './social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from './auth-response/social-auth-response';
import {Observable, throwError} from 'rxjs';
import {SignInOptionsMap} from './strategy/options-map/sign-in-options-map';
import {StateOptionsMap} from './strategy/options-map/state-options-map';
import {SignOutOptionsMap} from './strategy/options-map/sign-out-options-map';

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

  /**
   * Signs in the user
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType]
   */
  signIn<K extends NgxSocialAuthProviderType>(providerType: K, options?: SignInOptionsMap[K]): Observable<NgxSocialAuthResponse<K>> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.singIn(options) : this.throwUndefinedProviderError(providerType);
  }

  /**
   * Signs out the current account from the application
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   */
  signOut<K extends NgxSocialAuthProviderType>(providerType: K, options?: SignOutOptionsMap[K]): Observable<void> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.signOut(options) : this.throwUndefinedProviderError(providerType);
  }

  /**
   * Get current auth state
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType] if the user is authenticated, otherwise 'null'
   */
  getState<K extends NgxSocialAuthProviderType>(providerType: K, options?: StateOptionsMap[K]): Observable<NgxSocialAuthResponse<K>> {
    const strategy = this.findStrategy(providerType);

    return strategy ? strategy.getState(options) : this.throwUndefinedProviderError(providerType);
  }

  private findStrategy<K extends NgxSocialAuthProviderType>(providerType: K): SocialAuthStrategy<K> | undefined {
    return this.socialAuthStrategies.find((strategy): strategy is SocialAuthStrategy<K> => strategy.isSupport(providerType));
  }

  private throwUndefinedProviderError(providerType: NgxSocialAuthProviderType): Observable<never> {
    return throwError(`Provider type is not defined. Type '${NgxSocialAuthProviderType[providerType]}.'`);
  }
}
