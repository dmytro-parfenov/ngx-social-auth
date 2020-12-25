import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {NgxSocialAuthProviderType, NgxSocialAuthResponse} from 'ngx-social-auth2';
import {AppAuthResponseBottomSheetData} from './app-auth-response-bottom-sheet-data';
import {ProviderNameService} from '../../core/provider-name.service';

@Component({
  selector: 'app-auth-response-bottom-sheet',
  templateUrl: './auth-response-bottom-sheet.component.html',
  styleUrls: ['./auth-response-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthResponseBottomSheetComponent {

  get authResponse(): NgxSocialAuthResponse {
    return this.data.authResponse;
  }

  get type(): NgxSocialAuthProviderType {
    return this.data.providerType;
  }

  get providerName(): string {
    return this.providerNameService.resolve(this.type) ?? '-';
  }

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: AppAuthResponseBottomSheetData,
              private readonly providerNameService: ProviderNameService) {
    if (!this.data) {
      throw new Error('AuthResponseBottomSheetComponent must contain MAT_BOTTOM_SHEET_DATA');
    }
  }

}
