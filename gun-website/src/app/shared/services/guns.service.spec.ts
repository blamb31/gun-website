import { TestBed } from '@angular/core/testing';

import { GunsService } from './guns.service';

describe('GunsService', () => {
  let service: GunsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
