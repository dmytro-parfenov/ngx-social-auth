import {NgxSocialAuthConfigMap} from './social-auth-config-map';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';

/**
 * Class that allows to create specific auth provider
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
export class NgxSocialAuthProvider<K extends keyof NgxSocialAuthConfigMap = NgxSocialAuthProviderType> {
  constructor(public readonly type: K,
              public readonly config: NgxSocialAuthConfigMap[K]) {}
}
