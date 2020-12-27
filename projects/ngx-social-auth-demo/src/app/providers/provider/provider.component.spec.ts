import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProviderComponent} from './provider.component';
import {Component, Input} from '@angular/core';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';
import {ProviderNameService} from '../../core/provider-name.service';

@Component({selector: 'app-provider-icon', template: ''})
class ProviderIconStubComponent {
  @Input() type: NgxSocialAuthProviderType | null = null;

  @Input() size = 40;
}

describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;
  let providerNameServiceSpy: jasmine.SpyObj<ProviderNameService>;

  beforeEach(async () => {
    const providerNameService = jasmine.createSpyObj('ProviderNameService', ['resolve']);

    await TestBed.configureTestingModule({
      declarations: [ ProviderComponent, ProviderIconStubComponent ],
      providers: [
        {provide: ProviderNameService, useValue: providerNameService}
      ]
    }).compileComponents();

    providerNameServiceSpy = TestBed.inject(ProviderNameService) as jasmine.SpyObj<ProviderNameService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get provider name', () => {
    component.type = NgxSocialAuthProviderType.Google;

    providerNameServiceSpy.resolve.and.returnValue('Google');

    expect(component.name).toBe('Google');
  });

  it('should emit sign in', () => {
    spyOn(component.signIn, 'emit');

    component.onSignIn();

    expect(component.signIn.emit).toHaveBeenCalled();
  });

  it('should emit sign out', () => {
    spyOn(component.signOut, 'emit');

    component.onSignOut();

    expect(component.signOut.emit).toHaveBeenCalled();
  });

  it('should emit showAuthResponse', () => {
    spyOn(component.showAuthResponse, 'emit');

    component.onShowAuthResponse();

    expect(component.showAuthResponse.emit).toHaveBeenCalled();
  });
});
