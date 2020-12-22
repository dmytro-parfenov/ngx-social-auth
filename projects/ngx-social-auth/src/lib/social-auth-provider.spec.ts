import {NgxSocialAuthProvider} from './social-auth-provider';
import {NgxSocialAuthProviderType} from './social-auth-provider-type.enum';

describe('NgxSocialAuthProvider', () => {
  it('should create', () => {
    const provider = new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google);

    expect(provider).toBeTruthy();
  });
});
