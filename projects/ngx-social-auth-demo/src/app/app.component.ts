import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {NgxSocialAuthProviderType, NgxSocialAuthService} from 'ngx-social-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  readonly providers = new Map<NgxSocialAuthProviderType, { isAuthenticated: boolean }>();

  get providersKeys(): NgxSocialAuthProviderType[] {
    return Array.from(this.providers.keys());
  }

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    (Object.keys(NgxSocialAuthProviderType) as NgxSocialAuthProviderType[]).forEach((value) => {
      this.ngxSocialAuthService.getState(value).pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        }),
        tap(authResponse => {
          console.log(`Signed in with '${NgxSocialAuthProviderType[value]}'`, authResponse);
        }),
        map(authResponse => !!authResponse),
        catchError(() => of(false)),
        tap(isAuthenticated => {
          this.providers.set(value, {isAuthenticated});
          this.changeDetectorRef.detectChanges();
        })
      ).subscribe();
    });
  }

  isAuthenticated(type: NgxSocialAuthProviderType): boolean {
    return !!this.providers.get(type)?.isAuthenticated;
  }

  signIn(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signIn(type).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }),
      tap(authResponse => {
        this.providers.set(type, { isAuthenticated: true });
        this.changeDetectorRef.detectChanges();
        console.log(`Signed in with '${NgxSocialAuthProviderType[type]}'`, authResponse);
      })
    ).subscribe();
  }

  signOut(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signOut(type).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }),
      tap(() => {
        this.providers.set(type, { isAuthenticated: false });
        this.changeDetectorRef.detectChanges();
        console.log(`Signed out from '${NgxSocialAuthProviderType[type]}'`);
      })
    ).subscribe();
  }
}
