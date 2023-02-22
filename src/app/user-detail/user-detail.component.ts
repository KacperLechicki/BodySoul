import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public userID: number;
  userDetail: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.params.subscribe((res) => {
      this.userID = res['id'];
      this.fetchUserDetails(this.userID);
    });
  }

  fetchUserDetails(userID: number): void {
    this.api.getRegisteredUserId(userID).subscribe((res) => {
      this.userDetail = res;
      
    });
  }
}
