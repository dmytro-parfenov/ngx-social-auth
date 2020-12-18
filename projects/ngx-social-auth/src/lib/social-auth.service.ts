import {Inject, Injectable} from '@angular/core';
import {SOCIAL_AUTH_PROVIDERS} from './provider/social-auth-providers.key';
import {SocialAuthProvider} from './provider/social-auth-provider';
import {SocialAuthProviderType} from './social-auth-provider-type.enum';
import {SocialAuthResponse} from './social-auth-response';
import {Observable, throwError} from 'rxjs';
import {MicrosoftAuthSignInOptions, MicrosoftAuthStateOptions, MicrosoftAutSignOutOptions} from './provider/microsoft/microsoft-auth';
import {FacebookAuthSignInOptions, FacebookAuthSignOutOptions, FacebookAuthStateOptions} from './provider/facebook/facebook-auth';
import {GoogleAuthSignInOptions, GoogleAuthSignOutOptions, GoogleAuthStateOptions} from './provider/google/google-auth';

/**
 * Allows to authenticate the user by using all configured entities in {@link SocialAuthModule.forRoot()}
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {

  constructor(@Inject(SOCIAL_AUTH_PROVIDERS) private readonly socialAuthProviders: SocialAuthProvider[]) { }

  signIn(providerType: SocialAuthProviderType, options?: any): Observable<SocialAuthResponse>;
  signIn(providerType: SocialAuthProviderType.Google, options?: GoogleAuthSignInOptions): Observable<SocialAuthResponse>;
  signIn(providerType: SocialAuthProviderType.Facebook, options?: FacebookAuthSignInOptions): Observable<SocialAuthResponse>;
  signIn(providerType: SocialAuthProviderType.Microsoft, options?: MicrosoftAuthSignInOptions): Observable<SocialAuthResponse>;
  /**
   * Signs in the user
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType]
   */
  signIn(providerType: SocialAuthProviderType, options?: any): Observable<SocialAuthResponse> {
    const provider = this.findProvider(providerType);

    return provider ? provider.singIn(options) : this.throwUndefinedProviderError(providerType);
  }


  signOut(providerType: SocialAuthProviderType, options?: any): Observable<void>;
  signOut(providerType: SocialAuthProviderType.Google, options?: GoogleAuthSignOutOptions): Observable<void>;
  signOut(providerType: SocialAuthProviderType.Facebook, options?: FacebookAuthSignOutOptions): Observable<void>;
  signOut(providerType: SocialAuthProviderType.Microsoft, options?: MicrosoftAutSignOutOptions): Observable<void>;
  /**
   * Signs out the current account from the application
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   */
  signOut(providerType: SocialAuthProviderType, options?: any): Observable<void> {
    const provider = this.findProvider(providerType);

    return provider ? provider.signOut(options) : this.throwUndefinedProviderError(providerType);
  }

  getState(providerType: SocialAuthProviderType, options?: any): Observable<SocialAuthResponse>;
  getState(providerType: SocialAuthProviderType.Google, options?: GoogleAuthStateOptions): Observable<SocialAuthResponse>;
  getState(providerType: SocialAuthProviderType.Facebook, options?: FacebookAuthStateOptions): Observable<SocialAuthResponse>;
  getState(providerType: SocialAuthProviderType.Microsoft, options?: MicrosoftAuthStateOptions): Observable<SocialAuthResponse>;
  /**
   * Get current auth state
   *
   * @param providerType provider type to call with
   * @param options specific provider options
   * @returns specific provider auth response based on [providerType] if the user is authenticated, otherwise 'null'
   */
  getState(providerType: SocialAuthProviderType, options?: any): Observable<SocialAuthResponse> {
    const provider = this.findProvider(providerType);

    return provider ? provider.getState(options) : this.throwUndefinedProviderError(providerType);
  }

  private findProvider(providerType: SocialAuthProviderType): SocialAuthProvider | undefined {
    return this.socialAuthProviders.find(provider => provider.type === providerType);
  }

  private throwUndefinedProviderError(providerType: SocialAuthProviderType): Observable<never> {
    return throwError(`Provider type is not defined. Type '${SocialAuthProviderType[providerType]}.'`);
  }
}
