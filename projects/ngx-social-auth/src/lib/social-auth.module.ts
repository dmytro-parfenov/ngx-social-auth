import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxSocialAuthModuleConfig} from './social-auth-module-config';
import {fromSocialAuthProviders} from './core/social-auth-providers';


/**
 * Allows to authenticate the user by using different social providers
 */
@NgModule()
export class NgxSocialAuthModule {
  static forRoot(config: NgxSocialAuthModuleConfig): ModuleWithProviders<NgxSocialAuthModule> {
    const socialAuthProviders = config.providers ?? [];
    const providers = fromSocialAuthProviders(socialAuthProviders);

    return {
      ngModule: NgxSocialAuthModule,
      providers
    };
  }
}
