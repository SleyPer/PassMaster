import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChestComponent } from './create-chest.component';

describe('CreateChestComponent', () => {
  let component: CreateChestComponent;
  let fixture: ComponentFixture<CreateChestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChestComponent]
    });
    fixture = TestBed.createComponent(CreateChestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
