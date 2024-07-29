import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../store/selectors/user.selectors';
import { addUser, loadUsers } from '../../store/actions/user.actions';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;

  columnDefs: ColDef<User>[] = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    {
      headerName: 'First Name',
      field: 'firstName',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      sortable: true,
      filter: true,
    },
    { headerName: 'Age', field: 'age', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    {
      headerName: 'Blood Group',
      field: 'bloodGroup',
      sortable: true,
      filter: true,
    },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    { headerName: 'Username', field: 'username', sortable: true, filter: true },
    { headerName: 'Height', field: 'height', sortable: true, filter: true },
    { headerName: 'Weight', field: 'weight', sortable: true, filter: true },
    {
      headerName: 'University',
      field: 'university',
      sortable: true,
      filter: true,
    },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },
  ];

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.store.dispatch(loadUsers());
  }

  addNewUser() {
    this.dialog.open(NewUserComponent);
  }
}
