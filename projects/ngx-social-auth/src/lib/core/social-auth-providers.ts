/**
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */

import {NgxSocialAuthProvider} from '../social-auth-provider';
import {Provider} from '@angular/core';
import {NgxSocialAuthProviderType} from '../social-auth-provider-type.enum';
import {GoogleAuthStrategyService} from '../strategy/google/google-auth-strategy.service';
import {GOOGLE_AUTH_CONFIG} from '../strategy/google/google-auth-config.token';
import {SOCIAL_AUTH_STRATEGIES} from '../strategy/social-auth-strategies.token';
import {FacebookAuthStrategyService} from '../strategy/facebook/facebook-auth-strategy.service';
import {FACEBOOK_AUTH_CONFIG} from '../strategy/facebook/facebook-auth-config.token';
import {MicrosoftAuthStrategyService} from '../strategy/microsoft/microsoft-auth-strategy.service';
import {MICROSOFT_AUTH_CONFIG} from '../strategy/microsoft/microsoft-auth-config.token';

/**
 * Returns an array of providers which describe how the `Injector` should be configured
 */
export function fromSocialAuthProviders(providers: NgxSocialAuthProvider[]): Provider[] {
  return providers
    .filter(entity => entity.type)
    .reduce<Provider[]>((previousValue, currentValue) =>
      previousValue.concat(resolveProvider(currentValue)), []);
}

/**
 * Returns an array of providers which describe how the `Injector` should be configured for the specific auth entity
 */
function resolveProvider(provider: NgxSocialAuthProvider): Provider[] {
  switch (provider.type) {
    case NgxSocialAuthProviderType.Google:
      return [
        {provide: SOCIAL_AUTH_STRATEGIES, useClass: GoogleAuthStrategyService, multi: true},
        {provide: GOOGLE_AUTH_CONFIG, useValue: provider.config}
      ];
    case NgxSocialAuthProviderType.Facebook:
      return [
        {provide: SOCIAL_AUTH_STRATEGIES, useClass: FacebookAuthStrategyService, multi: true},
        {provide: FACEBOOK_AUTH_CONFIG, useValue: provider.config}
      ];
    case NgxSocialAuthProviderType.Microsoft:
      return [
        {provide: SOCIAL_AUTH_STRATEGIES, useClass: MicrosoftAuthStrategyService, multi: true},
        {provide: MICROSOFT_AUTH_CONFIG, useValue: provider.config}
      ];
  }

  return [];
}

