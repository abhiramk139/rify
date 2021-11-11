import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/user';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  user: User = new User();
  userPopupDto: User = new User();
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(JSON.stringify(data['user']));

  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
