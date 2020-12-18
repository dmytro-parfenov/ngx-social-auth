import {ModuleWithProviders, NgModule} from '@angular/core';
import {SocialAuthConfig} from './social-auth-config';
import {fromSocialAuthEntities} from './core/social-auth-entities';


/**
 * Allows to authenticate the user by using different social providers
 */
@NgModule()
export class SocialAuthModule {
  static forRoot(config: SocialAuthConfig): ModuleWithProviders<SocialAuthModule> {
    return {
      ngModule: SocialAuthModule,
      providers: [fromSocialAuthEntities(config.entities)]
    };
  }
}
