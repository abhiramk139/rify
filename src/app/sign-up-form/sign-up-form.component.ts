import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = '';
  users: User[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (this.confirmPassword == this.user.password) {
      const userList = localStorage.getItem('userList');
      if (userList)
        this.users = JSON.parse(userList);
      let size = this.users.length;
      this.user.position = this.users[size-1].position + 1;
      this.user.role = 'USER'
      this.users.push(this.user);
      localStorage.setItem('userList', JSON.stringify(this.users));
      this.router.navigate(['login']);
    } else {
      alert("Password doesn't match");
    }
  }

}
