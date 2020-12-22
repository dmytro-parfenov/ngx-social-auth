import {InjectionToken} from '@angular/core';
import {MicrosoftAuthConfig} from './microsoft';

/**
 * An injection token is used to provide microsoft auth config data to the {@link MicrosoftAuthStrategyService}
 */
export const MICROSOFT_AUTH_CONFIG = new InjectionToken<MicrosoftAuthConfig>('Ngx.MicrosoftAuthConfig');
