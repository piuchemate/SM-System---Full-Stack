import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachManagementComponent } from './teach-management.component';

describe('TeachManagementComponent', () => {
  let component: TeachManagementComponent;
  let fixture: ComponentFixture<TeachManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachManagementComponent]
    });
    fixture = TestBed.createComponent(TeachManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
