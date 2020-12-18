import {InjectionToken} from '@angular/core';
import {SocialAuthProvider} from './social-auth-provider';

/**
 * An injection token contains {@link SocialAuthProvider} array. Can be unavailable if has no configuration for
 * entities in {@link SocialAuthModule.forRoot()}
 */
export const SOCIAL_AUTH_PROVIDERS = new InjectionToken<SocialAuthProvider[]>('social_auth_providers', {
  factory: () => []
});
