import {fromSocialAuthProviders} from './social-auth-providers';
import {NgxSocialAuthProvider} from '../social-auth-provider';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';

describe('SocialAuthProviders', () => {
  it('should return providers', () => {
    const socialAuthProviders: NgxSocialAuthProvider[] = [
      new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google)
    ];

    const providers = fromSocialAuthProviders(socialAuthProviders);

    expect(providers.length).not.toBeLessThan(1);
  });
});
