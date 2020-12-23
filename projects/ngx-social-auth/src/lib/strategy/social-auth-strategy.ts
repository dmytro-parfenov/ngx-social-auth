import {Observable} from 'rxjs';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from '../auth-response/social-auth-response';
import {SignInOptionsMap} from './options-map/sign-in-options-map';
import {SignOutOptionsMap} from './options-map/sign-out-options-map';
import {StateOptionsMap} from './options-map/state-options-map';

export interface SocialAuthStrategy<K extends NgxSocialAuthProviderType = NgxSocialAuthProviderType> {

  /**
   * Check whether is strategy support provider type
   */
  isSupport(type: NgxSocialAuthProviderType): boolean;

  /**
   * Signs in the user
   *
   * @param options specific provider options
   * @returns specific provider auth response
   */
  singIn(options?: SignInOptionsMap[K]): Observable<NgxSocialAuthResponse<K>>;

  /**
   * Signs out the current account from the application
   *
   * @param options specific provider options
   */
  signOut(options?: SignOutOptionsMap[K]): Observable<void>;

  /**
   * Get current auth state
   *
   * @param options specific provider options
   * @returns specific provider auth response if the user is authenticated, otherwise 'null'
   */
  getState(options?: StateOptionsMap[K]): Observable<NgxSocialAuthResponse<K>>;
}
