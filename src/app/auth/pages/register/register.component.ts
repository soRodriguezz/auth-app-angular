import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    const { nombre, correo, password } = this.miFormulario.value;

    this.authService.register(nombre, correo, password).subscribe((ok) => {
      ok === true
        ? this.router.navigateByUrl('/dashboard')
        : Swal.fire('Error', ok, 'error');
    });
  }
}
