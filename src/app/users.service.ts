import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UrlConstant } from './url-constant';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit {

  users: User[] = [];
  userBackup: User = new User();

  constructor(private httpClient: HttpClient, private urlConstant: UrlConstant) {
    // this.getAllUsers().subscribe(data => {
    //   this.users = data as User[];
    //   console.log("sss" + JSON.stringify(this.users));
    // },
    //   error => {
    //     console.log("error")
    //   });
    this.getAllUsersMethod();
  }

  ngOnInit() {

  }

  setUser(ele: any) {
    this.userBackup = ele;
  }
  getUser(): User {
    return this.userBackup;
  }


  getAllUsers() {
    console.log(this.urlConstant.UI_PORT);
    return this.httpClient.get(this.urlConstant.UI_PORT + 'assets/users.json')
      .pipe(tap(data => { console.log("complete loading!") }));
  }

  getAllUsersMethod(): User[] {
    // this.getAllUsers().subscribe(data => {
    //   this.users = data as User[];
    //   console.log("sss" + JSON.stringify(this.users));
    //   return this.users;
    // },
    //   error => {
    //     console.log("error")
    //     return [];
    //   });
    try {
      const data = localStorage.getItem('userList') != null ? localStorage.getItem('userList') : '';
      if (!data) throw 'no data found';
      this.users = JSON.parse(data);
    } catch (error) {

    }
    return this.users;
  }



  addUser(user: User) {
    this.users.push(user);
  }

  login(email: string, pass: string): boolean {
    const data = localStorage.getItem('userList') != null ? localStorage.getItem('userList') : '';
    if (!data) throw 'no data found';
    this.users = JSON.parse(data);
    let user = this.users.filter(ele => ele.email == email)[0];
    if (user && user.password == pass) {
      console.log("login successfull");
      return true;
    } else {
      console.log("login unsuccessfull");
      return false;
    }
  }

  // public completeLoading() {
  //   // this.slimLoadingBarService.complete();
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 0);
  // }

}
