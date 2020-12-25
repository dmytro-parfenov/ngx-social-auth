import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgxSocialAuthProviderType, NgxSocialAuthResponse, NgxSocialAuthService} from 'ngx-social-auth2';
import {authModuleConfig} from '../auth-module-config';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersComponent implements OnInit {

  readonly providerTypes = this.createProviderTypes();

  readonly authorizedProviders = new Map<NgxSocialAuthProviderType, NgxSocialAuthResponse>();

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadState();
  }

  trackProviderTypes(index: number): number {
    return index;
  }

  onSignIn(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signIn(type).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(authResponse => this.onAuthSuccess(type, authResponse));
  }

  onSignOut(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signOut(type).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(() => this.onSignOutSuccess(type));
  }

  private loadState(): void {
    this.providerTypes.forEach(type =>
      this.ngxSocialAuthService.getState(type).subscribe(authResponse => this.onAuthSuccess(type, authResponse))
    );
  }

  private onSignOutSuccess(type: NgxSocialAuthProviderType): void {
    this.authorizedProviders.delete(type);

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  private onAuthSuccess(type: NgxSocialAuthProviderType, authResponse: NgxSocialAuthResponse): void {
    this.authorizedProviders.set(type, authResponse);

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  private createProviderTypes(): NgxSocialAuthProviderType[] {
    return authModuleConfig.providers?.map(provider => provider.type) ?? [];
  }

  private handleError(error: any): Observable<never> {
    // TODO (Dmytro Parfenov): should be notifications
    console.error(error);

    return throwError(error);
  }

}
