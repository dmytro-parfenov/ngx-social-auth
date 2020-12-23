import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {GoogleAuthConfig} from '../strategy/google/google';
import {FacebookAuthConfig} from '../strategy/facebook/facebook';
import {MicrosoftAuthConfig} from '../strategy/microsoft/microsoft';

export interface SocialAuthConfigMap {
  readonly [NgxSocialAuthProviderType.Google]: GoogleAuthConfig;
  readonly [NgxSocialAuthProviderType.Facebook]: FacebookAuthConfig;
  readonly [NgxSocialAuthProviderType.Microsoft]: MicrosoftAuthConfig;
}
