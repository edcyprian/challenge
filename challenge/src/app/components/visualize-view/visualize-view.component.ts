import { Component } from '@angular/core';
import { NewUserComponent } from '../new-user/new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-visualize-view',
  templateUrl: './visualize-view.component.html',
  styleUrl: './visualize-view.component.scss',
})
export class VisualizeViewComponent {
  public selectedChartType!: string;
  users$!: Observable<User[]>;

  constructor(private dialog: MatDialog, private store: Store) {
    this.selectedChartType = 'pie'; // default chart type
  }

  addNewUser() {
    this.dialog.open(NewUserComponent);
  }

  ngOnInit(): void {
    // this.users$ = this.store.select(selectUsers);
  }

  onChartTypeChange(event: any) {
    this.selectedChartType = event.target.value;
  }
}
