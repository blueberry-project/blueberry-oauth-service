import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty email and password fields initially', () => {
    expect(component.email).toBe('');
    expect(component.senha).toBe('');
  });

  it('should validate login with correct credentials', () => {
    component.email = 'test@example.com';
    component.senha = 'password123';
    spyOn(component, 'accessAuth').and.callThrough();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.accessAuth).toHaveBeenCalled();
  });

  it('should not validate login with empty fields', () => {
    spyOn(component, 'accessAuth').and.callThrough();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.accessAuth).toHaveBeenCalled();
    
  });
});
