import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  formRegister: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onRegister() {
    this.authService.signUp(this.formRegister.value).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/authentication/login')
    })
  }
}
