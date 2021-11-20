import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../../../../core/models/campo.model'
import { CampoService } from '../../../../core/services/campo.service';

@Component({
  selector: 'app-campo-delete',
  templateUrl: './campo-delete.component.html',
  styleUrls: ['./campo-delete.component.css']
})
export class CampoDeleteComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage: string = 'No se pudo borrar el campo';

  constructor(public dialogRef: MatDialogRef<CampoDeleteComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo, public campoService: CampoService) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.showError = false;
     this.campoService.delete(this.campo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
    }).catch(responseError => {
      this.showError = true;
      this.erroMessage = responseError.error.message;
    });
  }

}
