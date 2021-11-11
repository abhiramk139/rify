import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/user';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})

export class MatDialogComponent implements OnInit {
  user: User = new User();
  userPopupDto: User = new User();
  constructor(public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(JSON.stringify(data['user']));

  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
