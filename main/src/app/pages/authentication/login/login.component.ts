import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  formLogin: FormGroup;
  showAlert: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signIn() {
    this.showAlert = false;

    this.authService.signIn(this.formLogin.value).subscribe(res => {
      this.showAlert = false;
      console.log(res)
      this.router.navigateByUrl('/dashboard')
    }, error => {
      this.showAlert = true;
      console.log(error)
    })
  }


}
