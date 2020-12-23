import {Inject, Injectable} from '@angular/core';
import {SocialAuthStrategy} from '../social-auth-strategy';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {BehaviorSubject, EMPTY, Observable, of, throwError} from 'rxjs';
import {MICROSOFT_AUTH_CONFIG} from './microsoft-auth-config.token';
import {NgxSocialAuthResponse} from '../../auth-response/social-auth-response';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {DOCUMENT} from '@angular/common';
import {SocialAuthConfigMap} from '../../provider/social-auth-config-map';
import {SignInOptionsMap} from '../options-map/sign-in-options-map';
import {SignOutOptionsMap} from '../options-map/sign-out-options-map';
import {StateOptionsMap} from '../options-map/state-options-map';

/**
 * Implements authentication by Microsoft
 *
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 *
 * @dynamic
 * @see https://angular.io/guide/angular-compiler-options#strictmetadataemit
 */
@Injectable()
export class MicrosoftAuthStrategyService implements
  SocialAuthStrategy<NgxSocialAuthProviderType.Microsoft> {

  private readonly APIUrl = 'https://alcdn.msauth.net/browser/2.8.0/js/msal-browser.min.js';

  /**
   * A behaviour subject that emits Msal instance
   */
  private msalInstance$$: BehaviorSubject<any> | null = null;

  /**
   * An instance of Microsoft API
   */
  private get msal(): any {
    return this.document.defaultView?.msal;
  }

  constructor(private readonly socialAuthUtilService: SocialAuthUtilService,
              @Inject(MICROSOFT_AUTH_CONFIG) private readonly configuration: SocialAuthConfigMap[NgxSocialAuthProviderType.Microsoft],
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  isSupport(type: NgxSocialAuthProviderType): boolean {
    return type === NgxSocialAuthProviderType.Microsoft;
  }

  // tslint:disable-next-line:max-line-length
  singIn(options?: SignInOptionsMap[NgxSocialAuthProviderType.Microsoft]): Observable<NgxSocialAuthResponse<NgxSocialAuthProviderType.Microsoft>> {
    return this.getMsalInstance().pipe(
      switchMap(msalInstance => {
        if (options?.isLoginRedirect) {
          msalInstance.loginRedirect(options);
          return EMPTY;
        }

        return fromPromise(msalInstance.loginPopup(options));
      }),
      map(providerResponse => ({providerResponse}))
    );
  }

  signOut(options?: SignOutOptionsMap[NgxSocialAuthProviderType.Microsoft]): Observable<void> {
    return this.getMsalInstance().pipe(
      switchMap(msalInstance => fromPromise<void>(msalInstance.logout(options)))
    );
  }

  // tslint:disable-next-line:max-line-length
  getState(options?: StateOptionsMap[NgxSocialAuthProviderType.Microsoft]): Observable<NgxSocialAuthResponse<NgxSocialAuthProviderType.Microsoft>> {
    if (!options) {
      options = {scopes: ['openid', 'profile', 'User.Read']};
    }

    return this.getMsalInstance().pipe(
      switchMap(msalInstance => this.loadWithAccount(msalInstance)),
      switchMap(msalWithAccount => {
        if (!options?.account) {
          options = {...options, account: msalWithAccount.account};
        }

        return fromPromise(msalWithAccount.instance.acquireTokenSilent(options));
      }),
      map(providerResponse => ({providerResponse}))
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
    return this.socialAuthUtilService.loadScript({src: this.APIUrl, async: true, defer: true}, 'body')
      .pipe(
        switchMap(() => this.createMsalInstance())
      );
  }

  private createMsalInstance(): Observable<any> {
    try {
      return of(new this.msal.PublicClientApplication(this.configuration));
    } catch (e) {
      return throwError('Unable to create Msal instance');
    }
  }

  /**
   * Load Msal instance with current account
   *
   * @param instance Msal instance
   */
  private loadWithAccount(instance: any): Observable<{ instance: any, account: any }> {
    const accounts = instance.getAllAccounts() || [];
    const currentAccount = accounts.length > 0 ? accounts[0] : null;

    const fromMsalInstance$ = of(currentAccount);

    /**
     * Used to handle the account after login redirect
     */
    const fromRedirect$ = fromPromise(instance.handleRedirectPromise()).pipe(
      map((response: any) => response?.account ?? null),
      catchError(() => of(null))
    );

    return fromMsalInstance$.pipe(
      switchMap(account => account ? of(account) : fromRedirect$),
      map(account => ({instance, account}))
    );
  }
}
