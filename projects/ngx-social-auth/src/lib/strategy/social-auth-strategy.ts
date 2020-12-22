import {Observable} from 'rxjs';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {NgxSocialAuthResponse} from '../social-auth-response';

export interface SocialAuthStrategy<O1 = any, O2 = any, O3 = any, C = any> {

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
  singIn(options?: O1): Observable<NgxSocialAuthResponse<C>>;

  /**
   * Signs out the current account from the application
   *
   * @param options specific provider options
   */
  signOut(options?: O2): Observable<void>;

  /**
   * Get current auth state
   *
   * @param options specific provider options
   * @returns specific provider auth response if the user is authenticated, otherwise 'null'
   */
  getState(options?: O3): Observable<NgxSocialAuthResponse<C>>;
}
