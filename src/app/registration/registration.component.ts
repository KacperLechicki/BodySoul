import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
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

  heightPlaceholder: string = 'Enter your weight first!';

  heightChangesSub: Subscription;
  weightChangesSub: Subscription;
  postSub: Subscription;
  updateUserSub: Subscription;

  public registerForm: FormGroup;
  public userIDUpdate: number;

  public isUpdateActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      bmi: [''],
      bmiResult: [''],
      gender: ['', Validators.required],
      requireTrainer: ['', Validators.required],
      package: ['', Validators.required],
      important: ['', Validators.required],
      haveGymBefore: ['', Validators.required],
      enquiryDate: ['', Validators.required],
    });

    this.heightChangesSub = this.registerForm.controls[
      'height'
    ].valueChanges.subscribe((res) => {
      this.calculateBMI(res);

      if (res === null) {
        this.registerForm.controls['bmiResult'].patchValue('');
      }
    });

    this.weightChangesSub = this.registerForm.controls[
      'weight'
    ].valueChanges.subscribe((res) => {
      if (res !== null) {
        this.heightPlaceholder = 'Height';
      } else {
        this.heightPlaceholder = 'Enter your weight first!';
        this.registerForm.controls['bmiResult'].patchValue('');
      }
    });

    this.updateUserSub = this.activatedRoute.params.subscribe((res) => {
      this.userIDUpdate = res['id'];
      this.api.getRegisteredUserId(this.userIDUpdate).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.postSub = this.api
        .postRegistration(this.registerForm.value)
        .subscribe((res) => {
          this.toastService.success({
            detail: 'Success',
            summary: 'Enquiry added',
            duration: 3000,
          });
        });
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

  onUpdate(): void {
    this.api
      .updateRegistredUser(this.registerForm.value, this.userIDUpdate)
      .subscribe((res) => {
        this.toastService.success({
          detail: 'Success',
          summary: 'Enquiry updated',
          duration: 3000,
        });
        this.registerForm.reset();
        this.router.navigate(['/list']);
      });
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

  calculateBMI(heightValue: number): void {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);

    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  fillFormToUpdate(value: User) {
    this.registerForm.setValue({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      weight: value.weight,
      height: value.height,
      bmi: value.bmi,
      bmiResult: value.bmiResult,
      gender: value.gender,
      requireTrainer: value.requireTrainer,
      package: value.package,
      important: value.important,
      haveGymBefore: value.haveGymBefore,
      enquiryDate: value.enquiryDate,
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.heightChangesSub.unsubscribe();
    this.weightChangesSub.unsubscribe();
    this.updateUserSub.unsubscribe();
  }
}
