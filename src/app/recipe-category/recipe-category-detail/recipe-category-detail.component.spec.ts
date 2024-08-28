import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryDetailComponent } from './recipe-category-detail.component';

describe('RecipeCategoryDetailComponent', () => {
  let component: RecipeCategoryDetailComponent;
  let fixture: ComponentFixture<RecipeCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCategoryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
