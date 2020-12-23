import {TestBed} from '@angular/core/testing';
import {SocialAuthUtilService} from './social-auth-util.service';

describe('SocialAuthUtilService', () => {
  let service: SocialAuthUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocialAuthUtilService,
      ],
    });

    service = TestBed.inject(SocialAuthUtilService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create script', () => {
    service.loadScript({src: ''}, 'body');

    expect().nothing();
  });
});

