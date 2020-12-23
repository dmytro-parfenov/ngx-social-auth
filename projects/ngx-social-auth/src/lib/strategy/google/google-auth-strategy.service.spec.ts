import {GoogleAuthStrategyService} from './google-auth-strategy.service';
import {SocialAuthUtilService} from '../../core/social-auth-util.service';
import {TestBed} from '@angular/core/testing';
import {GOOGLE_AUTH_CONFIG} from './google-auth-config.token';
import {of} from 'rxjs';
import {NgxSocialAuthProviderType} from '../../social-auth-provider-type.enum';
import {DOCUMENT} from '@angular/common';

const documentMock = {
  defaultView: {
    gapi: {
      load: (apiName: string, callback: () => void) => {
        setTimeout(() => {
          const googleUser = {
            getAuthResponse: () => ({access_token: ''})
          };

          documentMock.defaultView.gapi[apiName] = {
            init: async () => ({
              signIn: async () => googleUser,
              signOut: async () => null,
              currentUser: {
                get: () => googleUser
              }
            })
          };

          callback();
        });
      }
    } as {[key: string]: any}
  }
};

describe('GoogleAuthStrategyService', () => {
  let service: GoogleAuthStrategyService;
  let socialAuthUtilServiceSpy: jasmine.SpyObj<SocialAuthUtilService>;

  beforeEach(() => {
    const spySocialAuthUtilService = jasmine.createSpyObj('SocialAuthUtilService', ['loadScript']);

    TestBed.configureTestingModule({
      providers: [
        GoogleAuthStrategyService,
        { provide: SocialAuthUtilService, useValue: spySocialAuthUtilService },
        { provide: GOOGLE_AUTH_CONFIG, useValue: {} },
        { provide: DOCUMENT, useValue: documentMock }
      ],
    });

    service = TestBed.inject(GoogleAuthStrategyService);
    socialAuthUtilServiceSpy = TestBed.inject(SocialAuthUtilService) as jasmine.SpyObj<SocialAuthUtilService>;

    socialAuthUtilServiceSpy.loadScript.and.returnValue(of(new Event('load')));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should support Google provider type', () => {
    expect(service.isSupport(NgxSocialAuthProviderType.Google)).toBeTrue();
  });

  it('should sign in', (done: DoneFn) => {
    service.singIn().subscribe(response => {
      expect(response).toBeTruthy();

      done();
    });
  });

  it('should sign out', (done: DoneFn) => {
    service.signOut().subscribe(() => {
      expect().nothing();

      done();
    });
  });

  it('should get auth state', (done: DoneFn) => {
    service.singIn().subscribe(response => {
      expect(response).toBeTruthy();

      done();
    });
  });
});
