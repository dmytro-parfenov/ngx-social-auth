import {SocialAuthEntity} from '../social-auth-entity';
import {Provider} from '@angular/core';
import {SocialAuthProviderType} from '../social-auth-provider-type.enum';
import {GoogleAuthProviderService} from '../provider/google/google-auth-provider.service';
import {GOOGLE_AUTH_CONFIG} from '../provider/google/google-auth-config.key';
import {SOCIAL_AUTH_PROVIDERS} from '../provider/social-auth-providers.key';
import {FacebookAuthProviderService} from '../provider/facebook/facebook-auth-provider.service';
import {FACEBOOK_AUTH_CONFIG} from '../provider/facebook/facebook-auth-config.key';
import {MicrosoftAuthProviderService} from '../provider/microsoft/microsoft-auth-provider.service';
import {MICROSOFT_AUTH_CONFIG} from '../provider/microsoft/microsoft-auth-config.key';

/**
 * Returns an array of providers which describe how the `Injector` should be configured
 */
export function fromSocialAuthEntities(entities: SocialAuthEntity[] = []): Provider[] {
  return entities
    .filter(entity => entity.type)
    .reduce<Provider[]>((previousValue, currentValue) =>
      previousValue.concat(resolveSocialAuthProviders(currentValue)), []);
}

/**
 * Returns an array of providers which describe how the `Injector` should be configured for the specific auth entity
 */
function resolveSocialAuthProviders(entity: SocialAuthEntity): Provider[] {
  switch (entity.type) {
    case SocialAuthProviderType.Google:
      return [
        {provide: SOCIAL_AUTH_PROVIDERS, useClass: GoogleAuthProviderService, multi: true},
        {provide: GOOGLE_AUTH_CONFIG, useValue: entity.config}
      ];
    case SocialAuthProviderType.Facebook:
      return [
        {provide: SOCIAL_AUTH_PROVIDERS, useClass: FacebookAuthProviderService, multi: true},
        {provide: FACEBOOK_AUTH_CONFIG, useValue: entity.config}
      ];
    case SocialAuthProviderType.Microsoft:
      return [
        {provide: SOCIAL_AUTH_PROVIDERS, useClass: MicrosoftAuthProviderService, multi: true},
        {provide: MICROSOFT_AUTH_CONFIG, useValue: entity.config}
      ];
  }

  return [];
}

