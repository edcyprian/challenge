import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineComponent } from './line.component';
import { StoreModule } from '@ngrx/store';

describe('LineComponent', () => {
  let component: LineComponent;
  let fixture: ComponentFixture<LineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
