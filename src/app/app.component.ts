import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { passwordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/username.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly registrationService: RegistrationService) {}

  public registrationForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), forbiddenNameValidator(/admin/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      alternateEmails: this.fb.array([]),
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      })
    }, {validator: passwordValidator});

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checked => {
      checked ? this.email?.setValidators(Validators.required) : this.email?.clearValidators();
      this.email?.updateValueAndValidity();
    });
  }

  public get userName() {
    return this.registrationForm.get('userName');
  }

  public get email() {
    return this.registrationForm.get('email');
  }

  public get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  public addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  public loadData() {
    // The setValue() method can either be called on FormControl or FormGroup class:
    this.registrationForm.setValue({
      userName: 'Userame',
      password: 'Password',
      confirmPassword: 'Password',
      address: {
        city: 'City',
        state: 'State',
        postalCode: 'Postal Code'
      }
    });

    /* The setValue() method is very strict and will require to specify all the values of the form.
    In case you want to specify only some specific values, use the patchValue() method:
    this.registrationForm.patchValue({
      userName: 'Userame',
      password: 'Password',
      confirmPassword: 'Password'
    });
    */
  }

  public onSubmit() {
    this.registrationService.register(this.registrationForm.value).subscribe(response => console.log(response), error => console.error(error));
  }
}
