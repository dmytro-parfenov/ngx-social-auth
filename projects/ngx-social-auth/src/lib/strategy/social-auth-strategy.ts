import {Observable} from 'rxjs';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from '../auth-response/social-auth-response';

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
  singIn(options?: any): Observable<NgxSocialAuthResponse<K>>;

  /**
   * Signs out the current account from the application
   *
   * @param options specific provider options
   */
  signOut(options?: any): Observable<void>;

  /**
   * Get current auth state
   *
   * @param options specific provider options
   * @returns specific provider auth response if the user is authenticated, otherwise 'null'
   */
  getState(options?: any): Observable<NgxSocialAuthResponse<K>>;
}
