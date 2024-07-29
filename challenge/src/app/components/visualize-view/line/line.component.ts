import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../../store/selectors/user.selectors';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  public data: User[] = [];
  selectedOption: string = 'roleDistribution'; // Default option

  pieChartDatasets: { data: number[] }[] = [];
  pieChartLabels: string[] = [];
  public pieChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartLegend = true;

  public pieChartLegend = true;
  public pieChartPlugins = [];

  private readonly roleLabels = ['Admin', 'Users', 'Moderators'];
  private readonly ageLabels = [
    'Students',
    'Young Adults',
    'Twilight Youth',
    'Middle-age Adults',
    'Older Adults',
    'Senior Adults',
    'Retiring Adults',
    'Elderly',
  ];
  private readonly bloodGroupOrder = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];
  lineChartData!: ChartConfiguration<'line'>['data'];

  constructor(private store: Store) {
    this.store.select(selectUsers).subscribe((results) => {
      this.data = results;
      this.updateChartData(this.selectedOption);
    });
  }

  private getRoleDistribution(users: User[]): number[] {
    const roleCounts = Array(this.roleLabels.length).fill(0);
    users.forEach((user) => {
      const index = this.roleLabels.indexOf(
        user.role.charAt(0).toUpperCase() + user.role.slice(1)
      );
      if (index !== -1) roleCounts[index]++;
    });

    console.log('Role Groups', roleCounts);
    return roleCounts;
  }

  private getAgeGroupDistribution(users: User[]): number[] {
    const ageGroups = Array(this.ageLabels.length).fill(0);
    users.forEach((user) => {
      const age = user.age;
      const index = this.getAgeGroupIndex(age);
      if (index !== -1) ageGroups[index]++;
    });
    console.log('Age Groups', ageGroups);
    return ageGroups;
  }

  private getAgeGroupIndex(age: number): any {
    if (age >= 18 && age <= 24) return 0;
    if (age >= 25 && age <= 30) return 1;
    if (age >= 31 && age <= 36) return 2;
    if (age >= 37 && age <= 46) return 3;
    if (age >= 47 && age <= 52) return 4;
    if (age >= 53 && age <= 60) return 5;
    if (age >= 61 && age <= 66) return 6;
    if (age > 66) return 7;
    return null;
  }

  private getBloodGroupDistribution(users: User[]): number[] {
    const bloodGroups = Array(this.bloodGroupOrder.length).fill(0);
    users.forEach((user) => {
      const index = this.bloodGroupOrder.indexOf(user.bloodGroup);
      if (index !== -1) bloodGroups[index]++;
    });
    console.log('Blood Groups', bloodGroups);
    return bloodGroups;
  }

  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.updateChartData(selectedValue);
  }

  private updateChartData(option: string) {
    switch (option) {
      case 'roleDistribution':
        this.lineChartData = {
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };
        break;
      case 'ageDistribution':
        this.lineChartData = {
          labels: [this.ageLabels],
          datasets: [
            {
              data: this.getAgeGroupDistribution(this.data),
              fill: true,
            },
          ],
        };
        break;
      case 'bloodGroupDistribution':
        this.lineChartData = {
          labels: [this.bloodGroupOrder],
          datasets: [
            {
              data: this.getBloodGroupDistribution(this.data),
              fill: true,
            },
          ],
        };
        break;
      default:
        this.lineChartData = {
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };
    }
  }
}
