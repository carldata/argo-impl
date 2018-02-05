import { TestBed, inject } from '@angular/core/testing';

import { LoaderScreenService } from './loader-screen.service';

describe('LoaderScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderScreenService]
    });
  });

  it('should be created', inject([LoaderScreenService], (service: LoaderScreenService) => {
    expect(service).toBeTruthy();
  }));
});
