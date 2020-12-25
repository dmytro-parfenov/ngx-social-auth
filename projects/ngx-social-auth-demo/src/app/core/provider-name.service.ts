import {Injectable} from '@angular/core';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';

@Injectable({
  providedIn: 'root'
})
export class ProviderNameService {

  constructor() { }

  resolve(type: NgxSocialAuthProviderType): string {
    switch (type) {
      case NgxSocialAuthProviderType.Facebook:
        return 'Facebook';
      case NgxSocialAuthProviderType.Google:
        return 'Google';
      case NgxSocialAuthProviderType.Microsoft:
        return 'Microsoft';
    }

    return 'Unknown';
  }
}
