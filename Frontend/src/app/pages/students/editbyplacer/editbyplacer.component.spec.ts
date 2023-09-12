import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbyplacerComponent } from './editbyplacer.component';

describe('EditbyplacerComponent', () => {
  let component: EditbyplacerComponent;
  let fixture: ComponentFixture<EditbyplacerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditbyplacerComponent]
    });
    fixture = TestBed.createComponent(EditbyplacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
