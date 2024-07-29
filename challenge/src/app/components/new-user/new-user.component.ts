import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { addUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: DialogRef<NewUserComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: [
        null,
        [Validators.required, Validators.min(18), Validators.max(100)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      ],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      height: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
      university: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      // Dispatch action
      this.store.dispatch(addUser({ user }));
      // Assuming addUser is synchronous for this example
      this.dialogRef.close(user);
    }
  }
}
