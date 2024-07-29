// src/app/store/reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
} from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
  error: any;
}

export const initialState: UserState = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Load Users
  on(loadUsers, (state) => ({ ...state })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),

  // Add User
  on(addUser, (state) => ({ ...state })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(addUserFailure, (state, { error }) => ({ ...state, error })),

  // Update User
  on(updateUser, (state) => ({ ...state })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),
  on(updateUserFailure, (state, { error }) => ({ ...state, error })),

  // Delete User
  on(deleteUser, (state) => ({ ...state })),
  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== userId),
  })),
  on(deleteUserFailure, (state, { error }) => ({ ...state, error }))
);
