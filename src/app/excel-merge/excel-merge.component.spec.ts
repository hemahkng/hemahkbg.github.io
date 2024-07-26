import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMergeComponent } from './excel-merge.component';

describe('ExcelMergeComponent', () => {
  let component: ExcelMergeComponent;
  let fixture: ComponentFixture<ExcelMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
