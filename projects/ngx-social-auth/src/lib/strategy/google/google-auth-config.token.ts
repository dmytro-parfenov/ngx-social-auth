import {InjectionToken} from '@angular/core';
import {GoogleAuthConfig} from './google';

/**
 * An injection token is used to provide google auth config data to the {@link GoogleAuthStrategyService}
 */
export const GOOGLE_AUTH_CONFIG = new InjectionToken<GoogleAuthConfig>('Ngx.GoogleAuthConfig');
