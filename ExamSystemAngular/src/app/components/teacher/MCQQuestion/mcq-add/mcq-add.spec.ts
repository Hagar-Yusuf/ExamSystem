import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqAdd } from './mcq-add';

describe('McqAdd', () => {
  let component: McqAdd;
  let fixture: ComponentFixture<McqAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
