import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStudComponent } from './class-stud.component';

describe('ClassStudComponent', () => {
  let component: ClassStudComponent;
  let fixture: ComponentFixture<ClassStudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassStudComponent]
    });
    fixture = TestBed.createComponent(ClassStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
