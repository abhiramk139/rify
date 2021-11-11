import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  // user: User = new User();
  // nomenclatureConfigs: NomenclatureConfiguration[] = [];
  // nomenclatureConfiguration: NomenclatureConfiguration = new NomenclatureConfiguration();
  email = '';
  userpassword = '';
  logo = "";

  constructor(private appComponent: AppComponent, private router: Router
    , private userService: UsersService) { }

  ngOnInit(): void {
    // this.logo = this.urlConstant.UI_PORT+'assets/images/logo.png';
  }

  login() {
    let users: User[] = [];
    const userList = localStorage.getItem('userList');
    if (userList)
      users = JSON.parse(userList);
    let user = users.filter(ele => ele.email == this.email)[0];
    this.userService.setUser(user);
    if (user.status) {
      if (this.userService.login(this.email, this.userpassword)) {
        this.router.navigate(['/admin-dashboard', user.role]);
      } else {
        alert('Username or Password is wrong');
      }
    } else {
      alert('User is made inactive by the admin');
    }



  }

  signUp() {
    this.router.navigate(['/sign-up-form']);
  }
}
