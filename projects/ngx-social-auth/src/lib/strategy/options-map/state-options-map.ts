import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {GoogleAuthStateOptions} from '../google/google';
import {FacebookAuthStateOptions} from '../facebook/facebook';
import {MicrosoftAuthStateOptions} from '../microsoft/microsoft';

export interface StateOptionsMap {
  readonly [NgxSocialAuthProviderType.Google]: GoogleAuthStateOptions;
  readonly [NgxSocialAuthProviderType.Facebook]: FacebookAuthStateOptions;
  readonly [NgxSocialAuthProviderType.Microsoft]: MicrosoftAuthStateOptions;
}
