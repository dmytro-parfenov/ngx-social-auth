import {Inject, Injectable} from '@angular/core';
import {SocialAuthProvider} from '../social-auth-provider';
import {SocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {BehaviorSubject, EMPTY, Observable, of, throwError} from 'rxjs';
import {MICROSOFT_AUTH_CONFIG} from './microsoft-auth-config.key';
import {MicrosoftAuthConfig, MicrosoftAuthSignInOptions, MicrosoftAuthStateOptions, MicrosoftAutSignOutOptions} from './microsoft-auth';
import {SocialAuthResponse} from '../../social-auth-response';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {SocialAuthUtilsService} from '../../core/social-auth-utils.service';

/**
 * Implements authentication by Microsoft
 *
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/
 * @author Dmytro Parfenov <dmitryparfenov937@gmail.com>
 */
@Injectable()
export class MicrosoftAuthProviderService implements
  SocialAuthProvider<MicrosoftAuthSignInOptions, MicrosoftAutSignOutOptions, MicrosoftAuthStateOptions> {

  private readonly APIUrl = 'https://alcdn.msauth.net/lib/1.4.4/js/msal.min.js';

  readonly type = SocialAuthProviderType.Microsoft;

  /**
   * A behaviour subject that emits msal instance
   */
  private msalInstance$$: BehaviorSubject<any> | null = null;

  constructor(private readonly socialAuthUtilsService: SocialAuthUtilsService,
              @Inject(MICROSOFT_AUTH_CONFIG) private readonly configuration: MicrosoftAuthConfig) {
  }

  singIn(options?: MicrosoftAuthSignInOptions): Observable<SocialAuthResponse> {
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

  getState(options?: MicrosoftAuthStateOptions): Observable<SocialAuthResponse> {
    if (!options) {
      options = {scopes: ['openid', 'profile', 'User.Read']};
    }

    return this.getMsalInstance().pipe(
      switchMap(msalInstance => fromPromise(msalInstance.acquireTokenSilent(options))),
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

  private handleMsalInstance(salInstance: any): void {
    if (!this.msalInstance$$) {
      return;
    }

    this.msalInstance$$.next(salInstance);
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
      return of(new Msal.UserAgentApplication(this.configuration));
    } catch (e) {
      return throwError('Unable to create Msal instance');
    }
  }
}
