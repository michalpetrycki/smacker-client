import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipeCategoryDialogComponent } from './new-recipe-category-dialog.component';

describe('NewRecipeCategoryDialogComponent', () => {
  let component: NewRecipeCategoryDialogComponent;
  let fixture: ComponentFixture<NewRecipeCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipeCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecipeCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
