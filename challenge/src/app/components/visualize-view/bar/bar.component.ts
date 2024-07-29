import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { selectUsers } from '../../../store/selectors/user.selectors';
import { User } from '../../../models/user.model';
import { loadUsers } from '../../../store/actions/user.actions';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent {
  public data: User[] = [];
  selectedOption: string = 'roleDistribution'; // Default option

  barChartData!: {
    labels: string[];
    datasets: { data: number[]; label: string }[];
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public barChartLegend = true;
  public barChartPlugins = [];

  private bloodGroupOrder = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  private ageGroupLabels = [
    'Students',
    'Young Adults',
    'Twilight Youth',
    'Middle-age Adults',
    'Older Adults',
    'Senior Adults',
    'Retiring Adults',
    'Elderly',
  ];

  constructor(private store: Store) {
    this.store.select(selectUsers).subscribe((results) => {
      this.data = results;
      this.updateChartData(this.selectedOption);
    });
    this.store.dispatch(loadUsers());
  }

  private getRoleDistribution(users: User[]): number[][] {
    const roles = ['admin', 'user', 'moderator'];
    const roleDistribution = roles.map(() => [0, 0, 0]);

    for (const user of users) {
      const roleIndex = roles.indexOf(user.role);
      if (roleIndex !== -1) {
        roleDistribution[roleIndex][roleIndex]++;
      }
    }

    return roleDistribution;
  }

  private getAgeGroupDistribution(users: User[]): number[][] {
    const ageGroups = Array(this.ageGroupLabels.length)
      .fill(null)
      .map(() => Array(this.ageGroupLabels.length).fill(0));

    for (const user of users) {
      const age = user.age;
      let ageIndex = -1;
      if (age >= 18 && age <= 24) ageIndex = 0; // students
      else if (age >= 25 && age <= 30) ageIndex = 1; // young adults
      else if (age >= 31 && age <= 36) ageIndex = 2; // twilight youth
      else if (age >= 37 && age <= 46) ageIndex = 3; // middle-age adults
      else if (age >= 47 && age <= 52) ageIndex = 4; // older adults
      else if (age >= 53 && age <= 60) ageIndex = 5; // senior adults
      else if (age >= 61 && age <= 66) ageIndex = 6; // retiring adults
      else if (age > 66) ageIndex = 7; // the elderly

      if (ageIndex !== -1) {
        ageGroups[ageIndex][ageIndex]++;
      }
    }

    return ageGroups;
  }

  private getBloodGroupDistribution(users: User[]): number[][] {
    const bloodGroups = this.bloodGroupOrder.map(() =>
      Array(this.bloodGroupOrder.length).fill(0)
    );

    for (const user of users) {
      const index = this.bloodGroupOrder.indexOf(user.bloodGroup);
      if (index !== -1) {
        bloodGroups[index][index]++;
      }
    }

    return bloodGroups;
  }

  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.updateChartData(selectedValue);
  }

  private updateChartData(option: string) {
    switch (option) {
      case 'roleDistribution':
        const roleDistribution = this.getRoleDistribution(this.data);
        this.barChartData = {
          labels: ['Admin', 'Users', 'Moderators'],
          datasets: roleDistribution.map((data, index) => ({
            data,
            label: ['Admin', 'Users', 'Moderators'][index],
          })),
        };
        break;
      case 'ageDistribution':
        const ageDistribution = this.getAgeGroupDistribution(this.data);
        this.barChartData = {
          labels: this.ageGroupLabels,
          datasets: ageDistribution.map((data, index) => ({
            data,
            label: this.ageGroupLabels[index],
          })),
        };
        break;
      case 'bloodGroupDistribution':
        const bloodGroupDistribution = this.getBloodGroupDistribution(
          this.data
        );
        this.barChartData = {
          labels: this.bloodGroupOrder,
          datasets: bloodGroupDistribution.map((data, index) => ({
            data,
            label: this.bloodGroupOrder[index],
          })),
        };
        break;
      default:
        const defaultDistribution = this.getRoleDistribution(this.data);
        this.barChartData = {
          labels: ['Admin', 'Users', 'Moderators'],
          datasets: defaultDistribution.map((data, index) => ({
            data,
            label: ['Admin', 'Users', 'Moderators'][index],
          })),
        };
    }
  }
}
