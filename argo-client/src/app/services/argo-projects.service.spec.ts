import { TestBed, inject } from '@angular/core/testing';

import { ArgoProjectsService } from './argo-projects.service';

describe('ArgoProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArgoProjectsService]
    });
  });

  it('should be created', inject([ArgoProjectsService], (service: ArgoProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
