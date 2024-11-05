import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignComponent } from './sign.component';

describe('SignComponent', () => {
  let component: SignComponent;
  let fixture: ComponentFixture<SignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignComponent],
      imports: [FormsModule], // Importa FormsModule para o [(ngModel)]
    }).compileComponents();

    fixture = TestBed.createComponent(SignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar se o nome está presente', () => {
    const nomeInput = fixture.debugElement.query(By.css('#nome')).nativeElement;
    nomeInput.value = 'João';
    nomeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.nome).toBe('João');
  });

  it('deve validar o campo de senha', () => {
    const senhaInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    senhaInput.value = 'Senha@123';
    senhaInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.password).toBe('Senha@123');
  });

  it('deve validar o CPF com a máscara', () => {
    const cpfInput = fixture.debugElement.query(By.css('#cpf')).nativeElement;
    cpfInput.value = '123.456.789-10';
    cpfInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.cpf).toBe('123.456.789-10');
  });

  it('deve validar o botão de criar conta', () => {
    spyOn(component, 'createAccount');
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.createAccount).toHaveBeenCalled();
  });

  it('deve validar o botão de gerar pessoa', () => {
    spyOn(component, 'generatePerson');
    const button = fixture.debugElement.query(By.css('button[type="button"]')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.generatePerson).toHaveBeenCalled();
  });
});
