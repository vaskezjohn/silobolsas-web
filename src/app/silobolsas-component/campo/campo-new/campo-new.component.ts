import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../models/campo.model'
import { CampoService } from '../service/campo.service';

@Component({
  selector: 'app-campo-new',
  templateUrl: './campo-new.component.html',
  styleUrls: ['./campo-new.component.css']
})
export class CampoNewComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el campo';

  constructor(public dialogRef: MatDialogRef<CampoNewComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo, public campoService: CampoService) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  add() {
    this.showError = false;
     this.campoService.add(this.campo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
    });
  }

}
