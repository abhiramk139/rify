import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UrlConstant } from './url-constant';
import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rify-client-app';
  users: any;

  constructor(private userService: UsersService, private urlConstant: UrlConstant, private httpClient: HttpClient) {

  }

  ngOnInit() {
    const data = localStorage.getItem('userList');
    // let temp = JSON.parse(data);
    if (data == null) {
      this.getAllUsers().subscribe(data => {
        this.users = data as User[];
        console.log("sss" + JSON.stringify(this.users));
        localStorage.setItem('userList', JSON.stringify(this.users));
        console.log('local storage' + localStorage.getItem('userList'));
      },
        error => {
          console.log("error")
        });
    }

  }


  getAllUsers() {
    console.log(this.urlConstant.UI_PORT);
    return this.httpClient.get(this.urlConstant.UI_PORT + 'assets/users.json')
      .pipe(tap(data => { console.log("complete loading!") }));
  }





}
