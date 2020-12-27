import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthResponseBottomSheetComponent} from './auth-response-bottom-sheet.component';
import {AuthResponseBottomSheetData} from './auth-response-bottom-sheet-data';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {ProviderNameService} from '../../core/provider-name.service';
import {NgxSocialAuthProviderType} from 'ngx-social-auth2';
import {Component, Input} from '@angular/core';

const mockBottomSheetData: AuthResponseBottomSheetData = {
  providerType: NgxSocialAuthProviderType.Google,
  authResponse: {
    providerResponse: {}
  }
};

@Component({selector: 'app-provider-icon', template: ''})
class ProviderIconStubComponent {
  @Input() type: NgxSocialAuthProviderType | null = null;

  @Input() size = 40;
}

describe('AuthResponseBottomSheetComponent', () => {
  let component: AuthResponseBottomSheetComponent;
  let fixture: ComponentFixture<AuthResponseBottomSheetComponent>;
  let providerNameServiceSpy: jasmine.SpyObj<ProviderNameService>;

  beforeEach(async () => {
    const providerNameService = jasmine.createSpyObj('ProviderNameService', ['resolve']);

    await TestBed.configureTestingModule({
      declarations: [ AuthResponseBottomSheetComponent, ProviderIconStubComponent ],
      providers: [
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: mockBottomSheetData},
        {provide: ProviderNameService, useValue: providerNameService}
      ]
    }).compileComponents();

    providerNameServiceSpy = TestBed.inject(ProviderNameService) as jasmine.SpyObj<ProviderNameService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthResponseBottomSheetComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get auth response', () => {
    expect(component.authResponse).toEqual(mockBottomSheetData.authResponse);
  });

  it('should get type', () => {
    expect(component.type).toEqual(mockBottomSheetData.providerType);
  });

  it('should get provider name', () => {
    providerNameServiceSpy.resolve.and.returnValue('Google');

    expect(component.providerName).toBe('Google');
  });
});
