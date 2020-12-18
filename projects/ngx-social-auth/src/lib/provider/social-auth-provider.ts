import {Observable} from 'rxjs';
import {SocialAuthProviderType} from '../social-auth-provider-type.enum';
import {SocialAuthResponse} from '../social-auth-response';

export interface SocialAuthProvider<O1 = any, O2 = any, O3 = any, C = any> {

  /**
   * Specific provider type
   */
  type: SocialAuthProviderType;

  /**
   * Signs in the user
   *
   * @param options specific provider options
   * @returns specific provider auth response
   */
  singIn(options?: O1): Observable<SocialAuthResponse<C>>;

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
  getState(options?: O3): Observable<SocialAuthResponse<C>>;
}
