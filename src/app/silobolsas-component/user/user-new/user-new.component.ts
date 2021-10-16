import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User} from '../models/user.model'

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserNewComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
