import { TestBed } from '@angular/core/testing';

import { VotosService } from './votos.service';

describe('VotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotosService = TestBed.get(VotosService);
    expect(service).toBeTruthy();
  });
});
