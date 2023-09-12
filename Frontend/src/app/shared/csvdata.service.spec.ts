import { TestBed } from '@angular/core/testing';

import { CsvdataService } from './csvdata.service';

describe('CsvdataService', () => {
  let service: CsvdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
