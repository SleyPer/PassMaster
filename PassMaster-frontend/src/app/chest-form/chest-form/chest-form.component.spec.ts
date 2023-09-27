import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestFormComponent } from './chest-form.component';

describe('ChestFormComponent', () => {
  let component: ChestFormComponent;
  let fixture: ComponentFixture<ChestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChestFormComponent]
    });
    fixture = TestBed.createComponent(ChestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
