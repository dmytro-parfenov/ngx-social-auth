import {InjectionToken} from '@angular/core';
import {FacebookAuthConfig} from './facebook';

/**
 * An injection token is used to provide facebook auth config data to the {@link FacebookAuthStrategyService}
 */
export const FACEBOOK_AUTH_CONFIG = new InjectionToken<FacebookAuthConfig>('Ngx.FacebookAuthConfig');
