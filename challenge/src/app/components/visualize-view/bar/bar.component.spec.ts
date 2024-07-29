import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarComponent } from './bar.component';
import { StoreModule } from '@ngrx/store';

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarComponent],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
