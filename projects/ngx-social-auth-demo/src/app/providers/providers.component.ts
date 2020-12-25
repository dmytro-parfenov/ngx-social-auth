import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSocialAuthProviderType, NgxSocialAuthResponse, NgxSocialAuthService} from 'ngx-social-auth2';
import {authModuleConfig} from '../auth-module-config';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AuthResponseBottomSheetComponent} from '../shared/auth-response-bottom-sheet/auth-response-bottom-sheet.component';
import {AppAuthResponseBottomSheetData} from '../shared/auth-response-bottom-sheet/app-auth-response-bottom-sheet-data';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersComponent implements OnInit, OnDestroy {

  private readonly destroy$$ = new Subject<void>();

  readonly providerTypes = this.createProviderTypes();

  readonly authorizedProviders = new Map<NgxSocialAuthProviderType, NgxSocialAuthResponse>();

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly matBottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.loadState();
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  trackProviderTypes(index: number): number {
    return index;
  }

  onSignIn(type: NgxSocialAuthProviderType): void {
    this.ngxSocialAuthService.signIn(type).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(authResponse => this.onAuthSuccess(type, authResponse));
  }

  showAuthResponse(providerType: NgxSocialAuthProviderType): void {
    const authResponse = this.authorizedProviders.get(providerType);

    if (!authResponse) {
      // TODO (Dmytro Parfenov): should be notifications
      console.error('Unable to show auth response');
      return;
    }

    this.matBottomSheet.open<AuthResponseBottomSheetComponent, AppAuthResponseBottomSheetData>(
      AuthResponseBottomSheetComponent,
      {data: {providerType, authResponse}}
    );
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
