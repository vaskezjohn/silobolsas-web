import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Productor } from 'src/app/core/models/productor.model';
import { ProductorService } from 'src/app/core/services/productor.service';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  public productores?: Array<Productor>;
  
  constructor(public dialogRef: MatDialogRef<UserViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice, public productorService: ProductorService) { }

  ngOnInit(): void {
    this.getProductores();
  }

  close() {
    this.dialogRef.close();
  }

  getProductores() {
    this.productorService.ProductorList().subscribe((response: Array<Productor>) => {
      this.productores = response;
    });
  }
}
