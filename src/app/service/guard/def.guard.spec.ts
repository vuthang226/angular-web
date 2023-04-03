import { TestBed } from '@angular/core/testing';

import { DefGuard } from './def.guard';

describe('DefGuard', () => {
  let guard: DefGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DefGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
