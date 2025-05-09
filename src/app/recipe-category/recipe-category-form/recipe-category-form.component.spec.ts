import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryFormComponent } from './recipe-category-form.component';

describe('RecipeCategoryFormComponent', () => {
  let component: RecipeCategoryFormComponent;
  let fixture: ComponentFixture<RecipeCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
