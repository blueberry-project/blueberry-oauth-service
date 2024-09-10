import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOauthComponent } from './create-oauth.component';

describe('CreateOauthComponent', () => {
  let component: CreateOauthComponent;
  let fixture: ComponentFixture<CreateOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOauthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
