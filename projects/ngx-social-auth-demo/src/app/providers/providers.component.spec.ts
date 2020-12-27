import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxSocialAuthProviderType, NgxSocialAuthService} from 'ngx-social-auth2';
import {EMPTY, of} from 'rxjs';
import {ProvidersComponent} from './providers.component';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {ToastrModule} from 'ngx-toastr';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {authModuleConfig} from '../auth-module-config';

@Component({selector: 'app-provider', template: ''})
class ProviderStubComponent {
  @Input() type: NgxSocialAuthProviderType | null = null;

  @Input() isAuthorized = false;

  @Input() isPending = true;

  @Output() signIn = new EventEmitter<void>();

  @Output() signOut = new EventEmitter<void>();

  @Output() showAuthResponse = new EventEmitter<void>();
}

describe('ProvidersComponent', () => {
  let component: ProvidersComponent;
  let fixture: ComponentFixture<ProvidersComponent>;
  let socialAuthServiceSpy: jasmine.SpyObj<NgxSocialAuthService>;
  let matBottomSheetSpy: jasmine.SpyObj<MatBottomSheet>;

  beforeEach(async () => {
    const socialAuthService = jasmine.createSpyObj('NgxSocialAuthService', ['signIn', 'signOut', 'getState']);
    const matBottomSheet = jasmine.createSpyObj('MatBottomSheet', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatBottomSheetModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ProvidersComponent,
        ProviderStubComponent
      ],
      providers: [
        {provide: NgxSocialAuthService, useValue: socialAuthService},
        {provide: MatBottomSheet, useValue: matBottomSheet}
      ]
    })
      .compileComponents();

    socialAuthServiceSpy = TestBed.inject(NgxSocialAuthService) as jasmine.SpyObj<NgxSocialAuthService>;
    matBottomSheetSpy = TestBed.inject(MatBottomSheet) as jasmine.SpyObj<MatBottomSheet>;

    socialAuthServiceSpy.signIn.and.returnValue(EMPTY);
    socialAuthServiceSpy.signOut.and.returnValue(EMPTY);
    socialAuthServiceSpy.getState.and.returnValue(EMPTY);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an array of provider types', () => {
    const configuredProviders = authModuleConfig.providers ?? [];

    expect(component.providerTypes.length).toBe(configuredProviders.length);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check pending state', () => {
    expect(component.isPending(NgxSocialAuthProviderType.Google)).toBeFalse();
  });

  it('should check authentication state', () => {
    expect(component.isAuthorized(NgxSocialAuthProviderType.Google)).toBeFalse();
  });

  it('should get auth state through the auth service', () => {
    expect(socialAuthServiceSpy.getState).toHaveBeenCalled();
  });

  it('should sign in through the auth service', () => {
    component.onSignIn(NgxSocialAuthProviderType.Google);

    expect(socialAuthServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should sign out through the auth service', () => {
    component.onSignOut(NgxSocialAuthProviderType.Google);

    expect(socialAuthServiceSpy.signOut).toHaveBeenCalled();
  });

  it('should track providers', () => {
    expect(component.trackProviderTypes(0)).toBe(0);
  });

  it('should show auth response', () => {
    socialAuthServiceSpy.signIn.and.returnValue(of({providerResponse: {}}));

    component.onSignIn(NgxSocialAuthProviderType.Google);

    component.showAuthResponse(NgxSocialAuthProviderType.Google);

    expect(matBottomSheetSpy.open).toHaveBeenCalled();
  });
});
