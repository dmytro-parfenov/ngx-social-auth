import {MicrosoftAuthStrategyService} from './microsoft-auth-strategy.service';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {MICROSOFT_AUTH_CONFIG} from './microsoft-auth-config.token';
import {DOCUMENT} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {finalize} from 'rxjs/operators';
import {MicrosoftAuthResponse} from './microsoft';

class PublicClientApplication {
  async loginPopup(): Promise<MicrosoftAuthResponse> {
    return {};
  }

  loginRedirect(): void {}

  async logout(): Promise<void> {}

  getAllAccounts(): object[] {
    return [{}];
  }

  async handleRedirectPromise(): Promise<MicrosoftAuthResponse> {
    return {};
  }

  async acquireTokenSilent(): Promise<MicrosoftAuthResponse> {
    return {};
  }
}

const documentMock = {
  defaultView: {
    msal: {
      PublicClientApplication
    }
  }
};

describe('MicrosoftAuthStrategyService', () => {
  let service: MicrosoftAuthStrategyService;
  let socialAuthUtilServiceSpy: jasmine.SpyObj<SocialAuthUtilService>;

  beforeEach(() => {
    const spySocialAuthUtilService = jasmine.createSpyObj('SocialAuthUtilService', ['loadScript']);

    TestBed.configureTestingModule({
      providers: [
        MicrosoftAuthStrategyService,
        { provide: SocialAuthUtilService, useValue: spySocialAuthUtilService },
        { provide: MICROSOFT_AUTH_CONFIG, useValue: {} },
        { provide: DOCUMENT, useValue: documentMock }
      ],
    });

    service = TestBed.inject(MicrosoftAuthStrategyService);
    socialAuthUtilServiceSpy = TestBed.inject(SocialAuthUtilService) as jasmine.SpyObj<SocialAuthUtilService>;

    socialAuthUtilServiceSpy.loadScript.and.returnValue(of(new Event('load')));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should support Microsoft provider type', () => {
    expect(service.isSupport(NgxSocialAuthProviderType.Microsoft)).toBeTrue();
  });

  it('should sign in with popup', (done: DoneFn) => {
    service.singIn().subscribe(response => {
      expect(response).toBeTruthy();

      done();
    });
  });

  it('should sign in with redirect', (done: DoneFn) => {
    service.singIn({isLoginRedirect: true}).pipe(
      finalize(() => {
        expect().nothing();

        done();
      })
    ).subscribe(() => fail('expect stream completion, not success'));
  });

  it('should sign out', (done: DoneFn) => {
    service.signOut().subscribe(() => {
      expect().nothing();

      done();
    });
  });

  it('should get auth state', (done: DoneFn) => {
    service.getState().subscribe(response => {
      expect(response).toBeTruthy();

      done();
    });
  });
});
