import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Productor} from '../../../../core/models/productor.model'
import { ProductorService } from '../../../../core/services/productor.service';
import { formatDate  } from '@angular/common'

@Component({
  selector: 'app-productor-view',
  templateUrl: './productor-view.component.html',
  styleUrls: ['./productor-view.component.css']
})
export class ProductorViewComponent implements OnInit {
  fechaAltaFormat = "";

  constructor( public dialogRef: MatDialogRef<ProductorViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public productor: Productor, public productorService: ProductorService) { }



  ngOnInit(): void {
    this.fechaAltaFormat = formatDate(this.productor.fechaAlta, 'dd-MM-yyyy', 'en-US');
  }

  close() {
    this.dialogRef.close();
  }
}
