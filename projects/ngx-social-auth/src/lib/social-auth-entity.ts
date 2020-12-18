import {SocialAuthProviderType} from './social-auth-provider-type.enum';
import {MicrosoftAuthConfig} from './provider/microsoft/microsoft-auth';
import {GoogleAuthConfig} from './provider/google/google-auth';
import {FacebookAuthConfig} from './provider/facebook/facebook-auth';

/**
 * Class that allows to create an entity for the specific auth provider
 */
export class SocialAuthEntity {
  constructor(type: SocialAuthProviderType, config?: any)
  constructor(type: SocialAuthProviderType.Google, config: GoogleAuthConfig)
  constructor(type: SocialAuthProviderType.Facebook, config: FacebookAuthConfig)
  constructor(type: SocialAuthProviderType.Microsoft, config: MicrosoftAuthConfig)
  constructor(public readonly type: SocialAuthProviderType, public readonly config?: any) {
  }
}
