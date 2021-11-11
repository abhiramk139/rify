import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/user';

export class Password {
  position: number = 1;
  previous: string = '';
  new: string = '';
  confirm: string = '';
}


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  user: User = new User();
  password: Password = new Password();
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(JSON.stringify(data['user']));
  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.password !== null && this.password.previous != null && this.password.previous.length > 0
      && this.password.new != null && this.password.new.length > 0
      && this.password.confirm != null && this.password.confirm.length > 0) {
      if (this.user.password == this.password.previous) {
        if (this.password.new == this.password.confirm) {
          this.password.position = this.user.position;
          this.dialogRef.close({result: this.password});
        } else {
          alert('New Password does not match');
        }
      } else {
        alert('You have entered wrong previous password');
      }
    }
  }
}
