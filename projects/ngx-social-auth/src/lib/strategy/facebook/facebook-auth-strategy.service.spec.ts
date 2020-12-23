import {FacebookAuthStrategyService} from './facebook-auth-strategy.service';
import {TestBed} from '@angular/core/testing';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {of, throwError} from 'rxjs';
import {FACEBOOK_AUTH_CONFIG} from './facebook-auth-config.token';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {DOCUMENT} from '@angular/common';
import {catchError} from 'rxjs/operators';

const documentMock = {
  defaultView: {
    FB: {
      init: () => {},
      login: (callback: (response?: any) => void) => {
        setTimeout(() => {
          callback({
            status: 'connected',
            authResponse: {}
          });
        });
      },
      logout: (callback: () => void) => {
        setTimeout(() => {
          callback();
        });
      },
      getLoginStatus: (callback: (response?: any) => void) => {
        setTimeout(() => {
          callback({
            status: 'connected',
            authResponse: {}
          });
        });
      }
    }
  }
};

describe('FacebookAuthStrategyService', () => {
  let service: FacebookAuthStrategyService;
  let socialAuthUtilServiceSpy: jasmine.SpyObj<SocialAuthUtilService>;

  beforeEach(() => {
    const spySocialAuthUtilService = jasmine.createSpyObj('SocialAuthUtilService', ['loadScript']);

    TestBed.configureTestingModule({
      providers: [
        FacebookAuthStrategyService,
        { provide: SocialAuthUtilService, useValue: spySocialAuthUtilService },
        { provide: FACEBOOK_AUTH_CONFIG, useValue: {} },
        { provide: DOCUMENT, useValue: documentMock}
      ],
    });

    service = TestBed.inject(FacebookAuthStrategyService);
    socialAuthUtilServiceSpy = TestBed.inject(SocialAuthUtilService) as jasmine.SpyObj<SocialAuthUtilService>;

    socialAuthUtilServiceSpy.loadScript.and.returnValue(of(new Event('load')));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should support Facebook provider type', () => {
    expect(service.isSupport(NgxSocialAuthProviderType.Facebook)).toBeTrue();
  });

  it('should sign in', (done: DoneFn) => {
    service.singIn().subscribe(response => {
      expect(response).toBeTruthy();

      done();
    });
  });

  it('should sign out', (done: DoneFn) => {
    service.signOut().pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    ).subscribe(() => {
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
