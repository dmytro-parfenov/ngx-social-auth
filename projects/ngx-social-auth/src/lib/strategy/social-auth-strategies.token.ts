import {InjectionToken} from '@angular/core';
import {SocialAuthStrategy} from './social-auth-strategy';

/**
 * An injection token contains {@link SocialAuthStrategy} array
 */
export const SOCIAL_AUTH_STRATEGIES = new InjectionToken<SocialAuthStrategy[]>('Ngx.SocialAuthStrategies', {
  factory: () => []
});
