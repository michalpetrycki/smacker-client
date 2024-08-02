import { TestBed } from '@angular/core/testing';

import { RecipeCategoryService } from './recipe-category.service';

describe('RecipeCategoryService', () => {
  let service: RecipeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
