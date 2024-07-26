import { TestBed } from '@angular/core/testing';

import { ExcelMergeService } from './excel-merge.service';

describe('ExcelMergeService', () => {
  let service: ExcelMergeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelMergeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
