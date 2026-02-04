import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudManagementComponent } from './stud-management.component';

describe('StudManagementComponent', () => {
  let component: StudManagementComponent;
  let fixture: ComponentFixture<StudManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudManagementComponent]
    });
    fixture = TestBed.createComponent(StudManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
