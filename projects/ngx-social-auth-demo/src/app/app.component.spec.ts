import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NgxSocialAuthProviderType, NgxSocialAuthService} from 'ngx-social-auth';
import {EMPTY} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let socialAuthServiceSpy: jasmine.SpyObj<NgxSocialAuthService>;

  beforeEach(async () => {
    const socialAuthService = jasmine.createSpyObj('NgxSocialAuthService', ['signIn', 'signOut', 'getState']);

    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        {provide: NgxSocialAuthService, useValue: socialAuthService}
      ]
    })
      .compileComponents();

    socialAuthServiceSpy = TestBed.inject(NgxSocialAuthService) as jasmine.SpyObj<NgxSocialAuthService>;

    socialAuthServiceSpy.signIn.and.returnValue(EMPTY);
    socialAuthServiceSpy.signOut.and.returnValue(EMPTY);
    socialAuthServiceSpy.getState.and.returnValue(EMPTY);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check authentication state', () => {
    component.socialAuthProviders.set(NgxSocialAuthProviderType.Microsoft, { isAuthenticated: true });

    expect(component.isAuthenticated(NgxSocialAuthProviderType.Microsoft)).toBeTrue();
    expect(component.isAuthenticated(NgxSocialAuthProviderType.Google)).toBeFalse();
  });

  it('should sign in through the auth service', () => {
    component.signIn(NgxSocialAuthProviderType.Google);

    expect(socialAuthServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should sign out through the auth service', () => {
    component.signOut(NgxSocialAuthProviderType.Google);

    expect(socialAuthServiceSpy.signOut).toHaveBeenCalled();
  });
});