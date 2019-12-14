import { TestBed } from '@angular/core/testing';

import { RegularAuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegularAuthService = TestBed.get(RegularAuthService);
    expect(service).toBeTruthy();
  });
});
