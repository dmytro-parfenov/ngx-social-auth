import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {NgxSocialAuthProviderType, NgxSocialAuthService} from 'ngx-social-auth2';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private readonly socialAuthProviders = new Map<NgxSocialAuthProviderType, { isAuthenticated: boolean }>();

  readonly socialAuthProviderTypes = Object.keys(NgxSocialAuthProviderType) as NgxSocialAuthProviderType[];

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadAuthState();
  }

  isLoggedIn(type: NgxSocialAuthProviderType): boolean {
    return !!this.socialAuthProviders.get(type)?.isAuthenticated;
  }

  onSignIn(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signIn(type).pipe(
      catchError(this.handleError.bind(this)),
      tap(authResponse => this.handleSignIn(type, authResponse))
    ).subscribe();
  }

  onSignOut(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signOut(type).pipe(
      catchError(this.handleError.bind(this)),
      tap(() => this.handleSignOut(type))
    ).subscribe();
  }

  private loadAuthState(): void {
    this.socialAuthProviderTypes.forEach((value) => {
      this.ngxSocialAuthService.getState(value).pipe(
        catchError(this.handleError.bind(this)),
        map(authResponse => !!authResponse),
        catchError(() => of(false)),
        tap(isAuthenticated => this.handleGetState(value, isAuthenticated))
      ).subscribe();
    });
  }

  private handleGetState(type: NgxSocialAuthProviderType, isAuthenticated: boolean): void {
    this.socialAuthProviders.set(type, {isAuthenticated});
    this.changeDetectorRef.detectChanges();

    if (!environment.production) {
      console.log(`Auth state for '${NgxSocialAuthProviderType[type]}' is ${isAuthenticated}`);
    }
  }

  private handleSignIn(type: NgxSocialAuthProviderType, authResponse: any): void {
    this.socialAuthProviders.set(type, { isAuthenticated: true });
    this.changeDetectorRef.detectChanges();

    if (!environment.production) {
      console.log(`Signed in with '${NgxSocialAuthProviderType[type]}'`, authResponse);
    }
  }

  private handleSignOut(type: NgxSocialAuthProviderType): void {
    this.socialAuthProviders.set(type, { isAuthenticated: false });
    this.changeDetectorRef.detectChanges();

    if (!environment.production) {
      console.log(`Signed out from '${NgxSocialAuthProviderType[type]}'`);
    }
  }

  private handleError(error: any): Observable<never> {
    if (!environment.production) {
      console.error(error);
    }

    return throwError(error);
  }
}
