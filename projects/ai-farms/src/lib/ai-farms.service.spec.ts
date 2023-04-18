import { TestBed } from '@angular/core/testing';

import { AiFarmsService } from './ai-farms.service';

describe('AiFarmsService', () => {
  let service: AiFarmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiFarmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
