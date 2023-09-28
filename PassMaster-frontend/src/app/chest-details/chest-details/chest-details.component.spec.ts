import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestDetailsComponent } from './chest-details.component';

describe('ChestDetailsComponent', () => {
  let component: ChestDetailsComponent;
  let fixture: ComponentFixture<ChestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChestDetailsComponent]
    });
    fixture = TestBed.createComponent(ChestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
