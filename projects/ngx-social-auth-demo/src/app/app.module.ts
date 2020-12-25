import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSocialAuthModule} from 'ngx-social-auth2';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProviderComponent} from './providers/provider/provider.component';
import {ProviderIconComponent} from './shared/provider-icon/provider-icon.component';
import {CoreModule} from './core/core.module';
import {ProvidersComponent} from './providers/providers.component';
import {authModuleConfig} from './auth-module-config';
import {AuthResponseBottomSheetComponent} from './shared/auth-response-bottom-sheet/auth-response-bottom-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    ProviderIconComponent,
    ProvidersComponent,
    AuthResponseBottomSheetComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxSocialAuthModule.forRoot(authModuleConfig),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CoreModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
