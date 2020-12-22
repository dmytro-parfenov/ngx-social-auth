import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NgxSocialAuthModuleConfig} from './social-auth-module-config';
import {fromSocialAuthProviders} from './core/social-auth-providers';


/**
 * Allows to authenticate the user by using different social providers
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@NgModule()
export class NgxSocialAuthModule {

  constructor(@Optional() @SkipSelf() parentModule?: NgxSocialAuthModule) {
    if (parentModule) {
      throw new Error(
        'NgxSocialAuthModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: NgxSocialAuthModuleConfig): ModuleWithProviders<NgxSocialAuthModule> {
    const socialAuthProviders = config.providers ?? [];
    const providers = fromSocialAuthProviders(socialAuthProviders);

    return {
      ngModule: NgxSocialAuthModule,
      providers
    };
  }
}
