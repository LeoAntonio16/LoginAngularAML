import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  errorMessage = signal('');
  errorMessagePassword = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges, this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debes ingresar un correo');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Correo invalido');
    } else {
      this.errorMessage.set('');
    }
  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('Ingresa una contraseña');
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword.set('La contraseña debe contener 6 caracteres como mínimo');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
    if (this.email.valid && this.password.valid) {
      console.log('Registro valido');
    }
  }
}
