import {TestBed} from '@angular/core/testing';
import {ProviderNameService} from './provider-name.service';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';

describe('ProviderNameService', () => {
  let service: ProviderNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProviderNameService ]
    });

    service = TestBed.inject(ProviderNameService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve provider name', () => {
    expect(service.resolve(NgxSocialAuthProviderType.Google)).toBe('Google');
    expect(service.resolve(NgxSocialAuthProviderType.Facebook)).toBe('Facebook');
    expect(service.resolve(NgxSocialAuthProviderType.Microsoft)).toBe('Microsoft');
  });
});
