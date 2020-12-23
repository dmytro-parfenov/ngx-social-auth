import {TestBed} from '@angular/core/testing';
import {SOCIAL_AUTH_STRATEGIES} from './strategy/social-auth-strategies.token';
import {NgxSocialAuthService} from './social-auth.service';
import {SocialAuthStrategy} from './strategy/social-auth-strategy';
import {NgxSocialAuthProviderType} from './social-auth-provider-type.enum';
import {forkJoin, of} from 'rxjs';

describe('NgxSocialAuthService', () => {
  let service: NgxSocialAuthService;
  let strategySpies: jasmine.SpyObj<SocialAuthStrategy>[];

  beforeEach(() => {
    const strategyMethods = ['isSupport', 'singIn', 'signOut', 'getState'];
    const spyStrategies = [
      jasmine.createSpyObj('GoogleAuthStrategyService', strategyMethods),
      jasmine.createSpyObj('MicrosoftAuthStrategyService', strategyMethods),
      jasmine.createSpyObj('FacebookAuthStrategyService', strategyMethods),
    ];

    TestBed.configureTestingModule({
      providers: [
        NgxSocialAuthService,
        {
          provide: SOCIAL_AUTH_STRATEGIES,
          useValue: spyStrategies,
        },
      ],
    });

    service = TestBed.inject(NgxSocialAuthService);
    strategySpies = TestBed.inject(SOCIAL_AUTH_STRATEGIES) as jasmine.SpyObj<SocialAuthStrategy>[];

    strategySpies.forEach((strategySpy, index) => {
      strategySpy.isSupport.and.callFake((type: NgxSocialAuthProviderType) => {
        switch (type) {
          case NgxSocialAuthProviderType.Facebook:
            return index === 0;
          case NgxSocialAuthProviderType.Google:
            return index === 1;
          case NgxSocialAuthProviderType.Microsoft:
            return index === 2;
        }
      });


      strategySpy.singIn.and.returnValue(of({providerResponse: {}}));
      strategySpy.signOut.and.returnValue(of<any>(null));
      strategySpy.getState.and.returnValue(of({providerResponse: {}}));
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in through the strategies', (done: DoneFn) => {
    const requests$ = [
      service.signIn(NgxSocialAuthProviderType.Google),
      service.signIn(NgxSocialAuthProviderType.Microsoft),
      service.signIn(NgxSocialAuthProviderType.Facebook)
    ];

    forkJoin(requests$).subscribe(() => {
      strategySpies.forEach(strategySpy => expect(strategySpy.singIn).toHaveBeenCalled());

      done();
    });
  });

  it('should sign out through the strategies', (done: DoneFn) => {
    const requests$ = [
      service.signOut(NgxSocialAuthProviderType.Google),
      service.signOut(NgxSocialAuthProviderType.Microsoft),
      service.signOut(NgxSocialAuthProviderType.Facebook)
    ];

    forkJoin(requests$).subscribe(() => {
      strategySpies.forEach(strategySpy => expect(strategySpy.signOut).toHaveBeenCalled());

      done();
    });
  });

  it('should get auth state through the strategies', (done: DoneFn) => {
    const requests$ = [
      service.getState(NgxSocialAuthProviderType.Google),
      service.getState(NgxSocialAuthProviderType.Microsoft),
      service.getState(NgxSocialAuthProviderType.Facebook)
    ];

    forkJoin(requests$).subscribe(() => {
      strategySpies.forEach(strategySpy => expect(strategySpy.getState).toHaveBeenCalled());

      done();
    });
  });
});

