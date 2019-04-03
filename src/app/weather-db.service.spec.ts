import { TestBed } from '@angular/core/testing';

import { WeatherDbService } from './weather-db.service';

describe('WeatherDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherDbService = TestBed.get(WeatherDbService);
    expect(service).toBeTruthy();
  });
});
