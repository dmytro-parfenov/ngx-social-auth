import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProviderIconComponent} from './provider-icon.component';

describe('ProviderIconComponent', () => {
  let component: ProviderIconComponent;
  let fixture: ComponentFixture<ProviderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderIconComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderIconComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
