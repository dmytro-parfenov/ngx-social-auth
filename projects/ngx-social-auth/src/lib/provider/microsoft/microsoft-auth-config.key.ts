import {InjectionToken} from '@angular/core';
import {MicrosoftAuthConfig} from './microsoft-auth';

/**
 * An injection token is used to provide microsoft auth config data to the {@link MicrosoftAuthProviderService}
 */
export const MICROSOFT_AUTH_CONFIG = new InjectionToken<MicrosoftAuthConfig>('social_auth_provider.microsoft');
