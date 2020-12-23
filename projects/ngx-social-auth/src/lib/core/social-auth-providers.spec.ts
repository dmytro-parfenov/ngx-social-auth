import {fromSocialAuthProviders} from './social-auth-providers';
import {NgxSocialAuthProvider} from '../provider/social-auth-provider';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';

describe('SocialAuthProviders', () => {
  it('should return providers', () => {
    const socialAuthProviders: NgxSocialAuthProvider[] = [
      new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google, {client_id: ''})
    ];

    const providers = fromSocialAuthProviders(socialAuthProviders);

    expect(providers.length).not.toBeLessThan(1);
  });
});
