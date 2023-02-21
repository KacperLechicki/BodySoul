import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public packages: string[] = ['Monthly', 'Quarterly', 'Annual'];
  public genders: string[] = ['Male', 'Female', 'Other'];

  public importantList: string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  @ViewChild('choiceTrainer') choiceTrainer: ElementRef<HTMLDivElement>;
  @ViewChild('choiceGender') choiceGender: ElementRef<HTMLDivElement>;
  @ViewChild('choiceGym') choiceGym: ElementRef<HTMLDivElement>;

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      // bmi: ['', Validators.required],
      // bmiResult: ['', Validators.required],
      gender: ['', Validators.required],
      requireTrainer: ['', Validators.required],
      package: ['', Validators.required],
      important: ['', Validators.required],
      haveGymBefore: ['', Validators.required],
      enquiryDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();

      if (this.registerForm.controls['requireTrainer'].value == '') {
        this.choiceTrainer.nativeElement.style.border = '1px solid red';
      } else {
        this.choiceTrainer.nativeElement.style.border =
          '1px solid rgba(0, 0, 0, 0.38)';
      }
      if (this.registerForm.controls['gender'].value == '') {
        this.choiceGender.nativeElement.style.border = '1px solid red';
      } else {
        this.choiceGender.nativeElement.style.border =
          '1px solid rgba(0, 0, 0, 0.38)';
      }
      if (this.registerForm.controls['haveGymBefore'].value == '') {
        this.choiceGym.nativeElement.style.border = '1px solid red';
      } else {
        this.choiceGym.nativeElement.style.border =
          '1px solid rgba(0, 0, 0, 0.38)';
      }
    }
  }

  checkGenderValidation(): void {
    if (this.registerForm.controls['gender'].value !== '') {
      this.choiceGender.nativeElement.style.border =
        '1px solid rgba(0, 0, 0, 0.38)';
    }
  }

  checkTrainerValidation(): void {
    if (this.registerForm.controls['requireTrainer'].value !== '') {
      this.choiceTrainer.nativeElement.style.border =
        '1px solid rgba(0, 0, 0, 0.38)';
    }
  }

  checkGymValidation(): void {
    if (this.registerForm.controls['haveGymBefore'].value !== '') {
      this.choiceGym.nativeElement.style.border =
        '1px solid rgba(0, 0, 0, 0.38)';
    }
  }
}
