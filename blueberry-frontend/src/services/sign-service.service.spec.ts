import { TestBed } from '@angular/core/testing';

import { SignServiceService } from './sign-service.service';

describe('SignServiceService', () => {
  let service: SignServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
