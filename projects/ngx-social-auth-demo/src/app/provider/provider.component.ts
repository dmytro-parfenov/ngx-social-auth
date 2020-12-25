import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';
import {ProviderNameService} from '../core/provider-name.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderComponent {

  @Input() type: NgxSocialAuthProviderType | null = null;

  @Input() isLoggedIn = false;

  @Output() signIn = new EventEmitter<void>();

  @Output() signOut = new EventEmitter<void>();

  get name(): string {
    return this.type ? this.providerNameService.resolve(this.type) : '-';
  }

  constructor(private readonly providerNameService: ProviderNameService) { }

  onSignIn(): void {
    this.signIn.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }

}
