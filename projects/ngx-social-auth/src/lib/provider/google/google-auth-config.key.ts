import {InjectionToken} from '@angular/core';
import {GoogleAuthConfig} from './google-auth';

/**
 * An injection token is used to provide google auth config data to the {@link GoogleAuthProviderService}
 */
export const GOOGLE_AUTH_CONFIG = new InjectionToken<GoogleAuthConfig>('social_auth_config.google');
