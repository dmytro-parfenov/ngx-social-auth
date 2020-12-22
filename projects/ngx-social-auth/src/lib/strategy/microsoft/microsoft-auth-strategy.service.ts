import {Inject, Injectable} from '@angular/core';
import {SocialAuthStrategy} from '../social-auth-strategy';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {BehaviorSubject, EMPTY, Observable, of, throwError} from 'rxjs';
import {MICROSOFT_AUTH_CONFIG} from './microsoft-auth-config.token';
import {NgxSocialAuthResponse} from '../../social-auth-response';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {MicrosoftAuthConfig, MicrosoftAuthSignInOptions, MicrosoftAuthStateOptions, MicrosoftAutSignOutOptions} from './microsoft';

/**
 * Implements authentication by Microsoft
 *
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class MicrosoftAuthStrategyService implements
  SocialAuthStrategy<MicrosoftAuthSignInOptions, MicrosoftAutSignOutOptions, MicrosoftAuthStateOptions> {

  private readonly APIUrl = 'https://alcdn.msauth.net/browser/2.8.0/js/msal-browser.min.js';

  /**
   * A behaviour subject that emits Msal instance
   */
  private msalInstance$$: BehaviorSubject<any> | null = null;

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilService,
              @Inject(MICROSOFT_AUTH_CONFIG) private readonly configuration: MicrosoftAuthConfig) {
  }

  isSupport(type: NgxSocialAuthProviderType): boolean {
    return type === NgxSocialAuthProviderType.Microsoft;
  }

  singIn(options?: MicrosoftAuthSignInOptions): Observable<NgxSocialAuthResponse> {
    return this.getMsalInstance().pipe(
      switchMap(msalInstance => {
        if (options?.isLoginRedirect) {
          msalInstance.loginRedirect(options);
          return EMPTY;
        }

        return fromPromise(msalInstance.loginPopup(options));
      }),
      map(credentials => ({credentials}))
    );
  }

  signOut(): Observable<void> {
    return this.getMsalInstance().pipe(
      tap(msalInstance => msalInstance.logout()),
      switchMap(() => of<void>())
    );
  }

  getState(options?: MicrosoftAuthStateOptions): Observable<NgxSocialAuthResponse> {
    if (!options) {
      options = {scopes: ['openid', 'profile', 'User.Read']};
    }

    return this.getMsalInstance().pipe(
      switchMap(msalInstance => {
        if (!options?.account) {
          const accounts = msalInstance.getAllAccounts() || [];
          const account = accounts.length > 0 ? accounts[0] : null;
          options = {...options, account};
        }

        return fromPromise(msalInstance.acquireTokenSilent(options));
      }),
      map(credentials => ({credentials}))
    );
  }

  private getMsalInstance(): Observable<any> {
    if (this.msalInstance$$) {
      return this.msalInstance$$.asObservable().pipe(
        skipWhile(msalInstance => !msalInstance),
        take(1)
      );
    }

    this.msalInstance$$ = new BehaviorSubject(null);

    return this.loadMsalInstance().pipe(
      tap(this.handleMsalInstance.bind(this)),
      catchError(this.handleMsalInstanceError.bind(this))
    );
  }

  private handleMsalInstance(msalInstance: any): void {
    if (!this.msalInstance$$) {
      return;
    }

    this.msalInstance$$.next(msalInstance);
  }

  private handleMsalInstanceError(error: any): Observable<never> {
    if (this.msalInstance$$) {
      this.msalInstance$$.error(error);
    }

    return throwError(error);
  }

  private loadMsalInstance(): Observable<any> {
    return this.socialAuthUtilsService.loadScript({src: this.APIUrl, async: true, defer: true}, 'body')
      .pipe(
        switchMap(() => this.createMsalInstance())
      );
  }

  private createMsalInstance(): Observable<any> {
    try {
      return of(new msal.PublicClientApplication(this.configuration));
    } catch (e) {
      return throwError('Unable to create Msal instance');
    }
  }
}
