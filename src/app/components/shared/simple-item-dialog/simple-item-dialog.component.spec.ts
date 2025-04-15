import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleItemDialogComponent } from './simple-item-dialog.component';

describe('SimpleItemDialogComponent', () => {
  let component: SimpleItemDialogComponent;
  let fixture: ComponentFixture<SimpleItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
