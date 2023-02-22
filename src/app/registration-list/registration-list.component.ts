import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent {
  public dataSource: MatTableDataSource<User>;
  public users: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toastService: NgToastService
  ) {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getUsers();
  }

  getUsers(): void {
    this.api.getRegisteredUser().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number): void {
    this.router.navigate(['/update', id]);
  }

  delete(id: number): void {
    this.confirm.showConfirm(
      'Are you sure?',
      () => {
        this.api.deleteRegisteredUser(id).subscribe((res) => {
          this.toastService.success({
            detail: 'Success',
            summary: 'Deleted successfully',
            duration: 3000,
          });
          this.getUsers();
        });
      },
      () => {}
    );
  }
}
