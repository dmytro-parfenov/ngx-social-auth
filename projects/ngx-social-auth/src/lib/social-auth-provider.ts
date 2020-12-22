import {NgxSocialAuthProviderType} from './social-auth-provider-type.enum';
import {GoogleAuthConfig} from './strategy/google/google';
import {FacebookAuthConfig} from './strategy/facebook/facebook';
import {MicrosoftAuthConfig} from './strategy/microsoft/microsoft';

/**
 * Class that allows to create specific auth provider
 */
export class NgxSocialAuthProvider {
  constructor(type: NgxSocialAuthProviderType.Google, config: GoogleAuthConfig)
  constructor(type: NgxSocialAuthProviderType.Facebook, config: FacebookAuthConfig)
  constructor(type: NgxSocialAuthProviderType.Microsoft, config: MicrosoftAuthConfig)
  constructor(type: NgxSocialAuthProviderType, config?: any)
  constructor(public readonly type: NgxSocialAuthProviderType, public readonly config?: any) {
  }
}
