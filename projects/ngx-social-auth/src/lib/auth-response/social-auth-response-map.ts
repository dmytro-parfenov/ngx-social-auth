import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {GoogleAuthResponse} from '../strategy/google/google';
import {FacebookAuthResponse} from '../strategy/facebook/facebook';
import {MicrosoftAuthResponse} from '../strategy/microsoft/microsoft';

export interface SocialAuthResponseMap {
  readonly [NgxSocialAuthProviderType.Google]: GoogleAuthResponse;
  readonly [NgxSocialAuthProviderType.Facebook]: FacebookAuthResponse;
  readonly [NgxSocialAuthProviderType.Microsoft]: MicrosoftAuthResponse;
}
