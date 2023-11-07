import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMessagesComponent } from './friend-messages.component';

describe('FriendMessagesComponent', () => {
  let component: FriendMessagesComponent;
  let fixture: ComponentFixture<FriendMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendMessagesComponent]
    });
    fixture = TestBed.createComponent(FriendMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
