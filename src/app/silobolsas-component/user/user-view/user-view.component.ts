import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User} from '../models/user.model'
import { Userervice } from '../service/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: User, public userervice: Userervice) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
