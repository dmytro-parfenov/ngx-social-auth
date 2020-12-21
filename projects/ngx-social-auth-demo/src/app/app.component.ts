import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SocialAuthProviderType, SocialAuthService} from 'ngx-social-auth';
import {of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  readonly providers = new Map<SocialAuthProviderType, { isAuthenticated: boolean }>();

  get providersKeys(): SocialAuthProviderType[] {
    return Array.from(this.providers.keys());
  }

  constructor(private readonly socialAuthService: SocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    (Object.keys(SocialAuthProviderType) as SocialAuthProviderType[]).forEach((value) => {
      this.socialAuthService.getState(value).pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        }),
        tap(authResponse => {
          console.log(`Signed in with '${SocialAuthProviderType[value]}'`, authResponse);
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

  isAuthenticated(type: SocialAuthProviderType): boolean {
    return !!this.providers.get(type)?.isAuthenticated;
  }

  signIn(type: SocialAuthProviderType): void {
    this.socialAuthService.signIn(type).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }),
      tap(authResponse => {
        this.providers.set(type, { isAuthenticated: true });
        this.changeDetectorRef.detectChanges();
        console.log(`Signed in with '${SocialAuthProviderType[type]}'`, authResponse);
      })
    ).subscribe();
  }

  signOut(type: SocialAuthProviderType): void {
    this.socialAuthService.signOut(type).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }),
      tap(() => {
        this.providers.set(type, { isAuthenticated: false });
        this.changeDetectorRef.detectChanges();
        console.log(`Signed out from '${SocialAuthProviderType[type]}'`);
      })
    ).subscribe();
  }
}
