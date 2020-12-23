import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {GoogleAuthSignOutOptions} from '../google/google';
import {FacebookAuthSignOutOptions} from '../facebook/facebook';
import {MicrosoftAutSignOutOptions} from '../microsoft/microsoft';

export interface SignOutOptionsMap {
  readonly [NgxSocialAuthProviderType.Google]: GoogleAuthSignOutOptions;
  readonly [NgxSocialAuthProviderType.Facebook]: FacebookAuthSignOutOptions;
  readonly [NgxSocialAuthProviderType.Microsoft]: MicrosoftAutSignOutOptions;
}
