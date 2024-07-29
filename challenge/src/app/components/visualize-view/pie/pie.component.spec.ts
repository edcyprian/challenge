import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieComponent } from './pie.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

describe('PieComponent', () => {
  let store: Store<any>;
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;

  beforeEach(async () => {
    // Mock Store
    store = {
      select: jest.fn().mockReturnValue(
        of([
          { role: 'Admin', age: 25, bloodGroup: 'A+' },
          { role: 'User', age: 30, bloodGroup: 'O-' },
          // Add more mock data as needed
        ])
      ),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PieComponent],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedOption).toBe('roleDistribution');
    expect(component.pieChartOptions).toEqual({
      responsive: true,
      maintainAspectRatio: false,
    });
    expect(component.pieChartLegend).toBe(true);
    expect(component.pieChartPlugins).toEqual([]);
  });

  describe('getRoleDistribution', () => {
    it('should return the correct role distribution', () => {
      const result = (component as any).getRoleDistribution([
        { role: 'Admin', age: 25, bloodGroup: 'A+' },
        { role: 'Users', age: 30, bloodGroup: 'O-' },
      ]);
      expect(result).toEqual([1, 1, 0]); // Based on provided roles
    });
  });

  describe('getAgeGroupIndex', () => {
    it('should return the correct index for age groups', () => {
      expect((component as any).getAgeGroupIndex(25)).toBe(1);
      expect((component as any).getAgeGroupIndex(30)).toBe(1);
      expect((component as any).getAgeGroupIndex(60)).toBe(5);
      expect((component as any).getAgeGroupIndex(67)).toBe(7);
    });

    it('should return null for invalid age', () => {
      expect((component as any).getAgeGroupIndex(17)).toBeNull();
      expect((component as any).getAgeGroupIndex(100)).toBe(7);
    });
  });

  describe('getBloodGroupDistribution', () => {
    it('should return the correct blood group distribution', () => {
      const result = (component as any).getBloodGroupDistribution([
        { role: 'Admin', age: 25, bloodGroup: 'A+' },
        { role: 'User', age: 30, bloodGroup: 'O-' },
      ]);
      expect(result).toEqual([1, 0, 0, 0, 0, 0, 0, 1]); // Based on provided blood groups
    });
  });
});
