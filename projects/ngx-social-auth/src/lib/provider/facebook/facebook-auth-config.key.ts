import {InjectionToken} from '@angular/core';
import {FacebookAuthConfig} from './facebook-auth';

/**
 * An injection token is used to provide facebook auth config data to the {@link FacebookAuthProviderService}
 */
export const FACEBOOK_AUTH_CONFIG = new InjectionToken<FacebookAuthConfig>('social_auth_config.facebook');
