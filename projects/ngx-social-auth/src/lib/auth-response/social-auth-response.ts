import {NgxSocialAuthResponseMap} from './social-auth-response-map';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';

/**
 * Represents an object contains auth response
 */
export interface NgxSocialAuthResponse<K extends keyof NgxSocialAuthResponseMap = NgxSocialAuthProviderType> {
  providerResponse: NgxSocialAuthResponseMap[K];
}
