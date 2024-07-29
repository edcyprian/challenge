// src/app/store/selectors/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserById = (userId: number) =>
  createSelector(selectUserState, (state: UserState) =>
    state.users.find((user) => user.id === userId)
  );
