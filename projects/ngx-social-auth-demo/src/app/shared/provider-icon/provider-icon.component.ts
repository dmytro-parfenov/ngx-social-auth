import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';

@Component({
  selector: 'app-provider-icon',
  templateUrl: './provider-icon.component.html',
  styleUrls: ['./provider-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderIconComponent {

  @Input() type: NgxSocialAuthProviderType | null = null;

  @Input() size = 40;

  constructor() { }

}
