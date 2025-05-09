import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerEntityBuilderComponent } from './drawer-entity-builder.component';

describe('DrawerEntityBuilderComponent', () => {
  let component: DrawerEntityBuilderComponent;
  let fixture: ComponentFixture<DrawerEntityBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerEntityBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerEntityBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
