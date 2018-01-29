import { TestBed, inject } from '@angular/core/testing';

import { HydraHttpBackendService } from './hydra-http-backend.service';

describe('HydraHttpBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HydraHttpBackendService]
    });
  });

  it('should be created', inject([HydraHttpBackendService], (service: HydraHttpBackendService) => {
    expect(service).toBeTruthy();
  }));
});
