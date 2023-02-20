import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public packages = ['Monthly', 'Quarterly', 'Annual'];
  public genders = ['Male', 'Female', 'Other'];
}
