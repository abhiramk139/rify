import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from '../stock';
import { User } from '../user';
import { UsersService } from '../users.service';
import { ChangePasswordComponent, Password } from './change-password/change-password.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { FormControl } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';
import { UrlConstant } from '../url-constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  opened: boolean = false;

  users: User[] = [];
  displayedColumns: string[] = ['position', 'name', 'email', 'username', 'edit', 'active', 'delete'];
  dataSource: any;
  user: User = new User();
  currentRole: string = '';
  totalUsers: number = 0;

  filteredOptions: Observable<Stock[]> = new Observable();
  options: Stock[] = [];
  myControl = new FormControl();

  selectedStock:any;

  constructor(private userService: UsersService, public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private changeDetectorRefs: ChangeDetectorRef, private urlConstant: UrlConstant, private httpClient: HttpClient) { }


  ngOnInit(): void {
    this.getUsers();
    const role = this.route.snapshot.paramMap.get('role');
    if (role)
      this.currentRole = role;

    this.getAllStocks().subscribe(res => {
      this.options = res as Stock[];
    },
      error => {

      });


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Stock[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getAllStocks() {
    console.log(this.urlConstant.UI_PORT);
    return this.httpClient.get(this.urlConstant.UI_PORT + 'assets/stock.json')
      .pipe(tap(data => { console.log("complete loading!") }));
  }

  signOut() {
    this.router.navigate(['login']);
  }

  toggleMenu() {

    this.opened = !this.opened;
  }

  getUsers() {
    this.users = this.userService.getAllUsersMethod();
    this.totalUsers = this.users.length;
    this.dataSource = this.users;
  }

  editUser() {

  }

  assignOption(option:any){
    this.selectedStock = option;

  }

  openDialog(element: User): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '550px',
      data: { user: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
      let itemIndex = this.users.findIndex(item => item.position == this.user.position);
      this.users[itemIndex] = this.user;
      localStorage.setItem('userList', JSON.stringify(this.users));
      setTimeout(() => {
        this.dataSource.data = this.users;
      }, 1000);
      this.changeDetectorRefs.detectChanges();
      this.totalUsers = this.users.length;
      window.location.reload();
      // this.dataSource = this.users;
      // this.users.
    });
  }

  deleteDialog(element: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '550px',
      data: { user: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
      this.users = this.users.filter(ele => ele.position != this.user.position);
      localStorage.setItem('userList', JSON.stringify(this.users));
      setTimeout(() => {
        this.dataSource = this.users;
        this.totalUsers = this.users.length;
      }, 1000);
      // this.users.
    });
  }

  toggleStatus(event: any, element: User) {
    let itemIndex = this.users.findIndex(item => item.position == element.position);
    element.status = event.checked;
    this.users[itemIndex] = element;
    localStorage.setItem('userList', JSON.stringify(this.users));
    this.dataSource = this.users;
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '550px',
      data: { user: this.userService.getUser() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let password: any = result;
      let itemIndex = this.users.findIndex(item => item.position == password['result'].position);
      this.users[itemIndex].password = password['result'].new;

      localStorage.setItem('userList', JSON.stringify(this.users));
      setTimeout(() => {
        this.dataSource = this.users;
      }, 1000);
    });
  }
}

