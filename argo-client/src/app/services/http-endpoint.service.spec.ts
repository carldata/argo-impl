import { TestBed, inject } from '@angular/core/testing';

import { HttpEndpointService } from './http-endpoint.service';

describe('HttpEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpEndpointService]
    });
  });

  it('should be created', inject([HttpEndpointService], (service: HttpEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
