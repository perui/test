import { TestBed, inject } from '@angular/core/testing';

import { OntologyService } from './ontology.service';
import {HttpClientModule} from '@angular/common/http';

describe('OntologyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OntologyService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([OntologyService], (service: OntologyService) => {
    expect(service).toBeTruthy();
  }));
});
