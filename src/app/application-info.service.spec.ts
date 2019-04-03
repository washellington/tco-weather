import { TestBed } from '@angular/core/testing';

import { ApplicationInfoService } from './application-info.service';

describe('ApplicationInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationInfoService = TestBed.get(ApplicationInfoService);
    expect(service).toBeTruthy();
  });
});
