import { TestBed } from '@angular/core/testing';

import { SintomasService } from '../services/sintomas.service';

describe('SintomasService', () => {
  let service: SintomasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SintomasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
