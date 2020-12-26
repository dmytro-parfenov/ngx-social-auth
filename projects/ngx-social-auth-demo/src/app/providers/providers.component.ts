import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {NgxSocialAuthProviderType, NgxSocialAuthResponse, NgxSocialAuthService} from 'ngx-social-auth2';
import {authModuleConfig} from '../auth-module-config';
import {defer, Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AuthResponseBottomSheetComponent} from '../shared/auth-response-bottom-sheet/auth-response-bottom-sheet.component';
import {AppAuthResponseBottomSheetData} from '../shared/auth-response-bottom-sheet/app-auth-response-bottom-sheet-data';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersComponent implements OnInit {

  private readonly authorizedProviders = new Map<NgxSocialAuthProviderType, NgxSocialAuthResponse>();

  private readonly pendingProviders = new Set<NgxSocialAuthProviderType>();

  readonly providerTypes = this.createProviderTypes();

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly matBottomSheet: MatBottomSheet,
              private readonly ngZone: NgZone,
              private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loadState();
  }

  isPending(type: NgxSocialAuthProviderType): boolean {
    return this.pendingProviders.has(type);
  }

  isAuthorized(type: NgxSocialAuthProviderType): boolean {
    return this.authorizedProviders.has(type);
  }

  trackProviderTypes(index: number): number {
    return index;
  }

  onSignIn(type: NgxSocialAuthProviderType): void {
    const request$ = this.ngxSocialAuthService.signIn(type).pipe(
      catchError(this.handleError.bind(this))
    );

    this.pendingForObservable(request$, type).subscribe(authResponse => this.onAuthSuccess(type, authResponse));
  }

  showAuthResponse(providerType: NgxSocialAuthProviderType): void {
    const authResponse = this.authorizedProviders.get(providerType);

    if (!authResponse) {
      this.toastrService.error('Unable to show auth response');
      return;
    }

    this.matBottomSheet.open<AuthResponseBottomSheetComponent, AppAuthResponseBottomSheetData>(
      AuthResponseBottomSheetComponent,
      {data: {providerType, authResponse}}
    );
  }

  onSignOut(type: NgxSocialAuthProviderType): void {
    const request$ = this.ngxSocialAuthService.signOut(type).pipe(
      catchError(this.handleError.bind(this))
    );

    this.pendingForObservable(request$, type).subscribe(() => this.onSignOutSuccess(type));
  }

  private loadState(): void {
    this.providerTypes.forEach(type => {
      const request$ = this.ngxSocialAuthService.getState(type);

      this.pendingForObservable(request$, type).subscribe(authResponse => this.onAuthSuccess(type, authResponse));
    });
  }

  private onSignOutSuccess(type: NgxSocialAuthProviderType): void {
    this.ngZone.run(() => {
      this.authorizedProviders.delete(type);

      this.changeDetectorRef.markForCheck();
    });
  }

  private onAuthSuccess(type: NgxSocialAuthProviderType, authResponse: NgxSocialAuthResponse): void {
    this.ngZone.run(() => {
      this.authorizedProviders.set(type, authResponse);

      this.changeDetectorRef.markForCheck();
    });
  }

  private createProviderTypes(): NgxSocialAuthProviderType[] {
    return authModuleConfig.providers?.map(provider => provider.type) ?? [];
  }

  private handleError(error: any): Observable<never> {
    this.toastrService.error('Something went wrong');

    return throwError(error);
  }

  private pendingForObservable<T>(observable: Observable<T>, type: NgxSocialAuthProviderType): Observable<T> {
    this.pendingProviders.add(type);

    this.changeDetectorRef.markForCheck();

    return  defer(() => observable).pipe(
      finalize(() => {
        this.ngZone.run(() => {
          this.pendingProviders.delete(type);

          this.changeDetectorRef.markForCheck();
        });
      })
    );
  }

}
