import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public loginForm: any = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.get('email').invalid) {
      if (this.loginForm.get('email').errors.required) {
        Swal.fire('Error', 'El email es requerido', 'error');
      } else if (this.loginForm.get('email').errors.email) {
        Swal.fire('Error', 'El email no es válido', 'error');
      }
    } else if (this.loginForm.get('password').invalid) {
      if (this.loginForm.get('password').errors.required) {
        Swal.fire('Error', 'La contraseña es requerida', 'error');
      }
    } else {
      this.usuarioService
        .login(this.loginForm.value)
        .pipe(
          tap((res) => {
            if (this.loginForm.get('remember').value) {
              localStorage.setItem('email', this.loginForm.get('email').value);
            } else {
              localStorage.removeItem('email');
            }
            // Navegar al dashboard
            this.router.navigateByUrl('/');
          }),
          catchError((err) => {
            Swal.fire('Error', err.error.message, 'error');
            throw err;
          })
        )
        .subscribe();
    }
  }
}
