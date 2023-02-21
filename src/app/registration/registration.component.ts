import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public packages: string[] = ['Monthly', 'Quarterly', 'Annual'];
  public genders: string[] = ['Male', 'Female', 'Other'];

  public importantList: string[] = ['Toxic Fat Reduction', 'Energy and Endurance', 'Building Lean Muscle', 'Healthier Digestive System', 'Sugar Craving Body', 'Fitness'];
}
