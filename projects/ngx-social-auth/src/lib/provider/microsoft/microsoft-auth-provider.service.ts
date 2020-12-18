import {Inject, Injectable} from '@angular/core';
import {SocialAuthProvider} from '../social-auth-provider';
import {SocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {Observable, of} from 'rxjs';
import {MICROSOFT_AUTH_CONFIG} from './microsoft-auth-config.key';
import {MicrosoftAuthConfig, MicrosoftAuthSignInOptions, MicrosoftAuthStateOptions, MicrosoftAutSignOutOptions} from './microsoft-auth';
import {SocialAuthResponse} from '../../social-auth-response';

/**
 * Implements authentication by Microsoft
 *
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class MicrosoftAuthProviderService implements
  SocialAuthProvider<MicrosoftAuthSignInOptions, MicrosoftAutSignOutOptions, MicrosoftAuthStateOptions> {

  readonly type = SocialAuthProviderType.Microsoft;

  // readonly userAgentApplication: UserAgentApplication;

  constructor(@Inject(MICROSOFT_AUTH_CONFIG) private readonly configuration: MicrosoftAuthConfig) {
    // this.userAgentApplication = new Msal.UserAgentApplication(this.configuration);
  }

  singIn(options?: MicrosoftAuthSignInOptions): Observable<SocialAuthResponse> {
    /*return fromPromise(this.userAgentApplication.loginPopup(options)).pipe(
      map(credentials => ({credentials}))
    );*/

    return of({credentials: null});
  }

  signOut(): Observable<void> {
    // this.userAgentApplication.logout();

    return of<void>();
  }

  getState(options?: MicrosoftAuthStateOptions): Observable<SocialAuthResponse> {
    /*if (!options) {
      options = {scopes: ['openid', 'profile', 'User.Read']};
    }

    return fromPromise(this.userAgentApplication.acquireTokenSilent(options)).pipe(
      map(credentials => ({credentials}))
    );*/

    return of({credentials: null});
  }
}
