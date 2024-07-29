import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeViewComponent } from './visualize-view.component';

describe('VisualizeViewComponent', () => {
  let component: VisualizeViewComponent;
  let fixture: ComponentFixture<VisualizeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
