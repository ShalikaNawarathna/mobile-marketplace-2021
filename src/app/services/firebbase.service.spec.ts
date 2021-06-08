import { TestBed } from '@angular/core/testing';

import { FirebbaseService } from './firebbase.service';

describe('FirebbaseService', () => {
  let service: FirebbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
