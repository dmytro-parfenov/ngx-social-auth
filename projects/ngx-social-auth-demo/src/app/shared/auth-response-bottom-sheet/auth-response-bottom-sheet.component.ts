import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {NgxSocialAuthProviderType, NgxSocialAuthResponse} from 'ngx-social-auth2';
import {AppAuthResponseBottomSheetData} from './app-auth-response-bottom-sheet-data';
import {ProviderNameService} from '../../core/provider-name.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-auth-response-bottom-sheet',
  templateUrl: './auth-response-bottom-sheet.component.html',
  styleUrls: ['./auth-response-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthResponseBottomSheetComponent {

  get authResponse(): NgxSocialAuthResponse {
    return this.data?.authResponse ?? null;
  }

  get type(): NgxSocialAuthProviderType | null {
    return this.data?.providerType ?? null;
  }

  get providerName(): string {
    return this.type ? this.providerNameService.resolve(this.type) : '-';
  }

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: AppAuthResponseBottomSheetData | null,
              private readonly providerNameService: ProviderNameService) {}

}
