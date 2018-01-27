import { TestBed, inject } from '@angular/core/testing';

import { HttpEndpointMockService } from './http-endpoint-mock.service';

describe('HttpEndpointMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpEndpointMockService]
    });
  });

  it('should be created', inject([HttpEndpointMockService], (service: HttpEndpointMockService) => {
    expect(service).toBeTruthy();
  }));
});
