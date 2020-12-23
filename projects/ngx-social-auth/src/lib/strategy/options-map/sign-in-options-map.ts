import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {GoogleAuthSignInOptions} from '../google/google';
import {FacebookAuthSignInOptions} from '../facebook/facebook';
import {MicrosoftAuthSignInOptions} from '../microsoft/microsoft';

export interface SignInOptionsMap {
  readonly [NgxSocialAuthProviderType.Google]: GoogleAuthSignInOptions;
  readonly [NgxSocialAuthProviderType.Facebook]: FacebookAuthSignInOptions;
  readonly [NgxSocialAuthProviderType.Microsoft]: MicrosoftAuthSignInOptions;
}
