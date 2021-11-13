import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Productor } from 'src/app/core/models/productor.model';
import { User } from 'src/app/core/models/user.model';
import { ProductorService } from 'src/app/core/services/productor.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user!: User;
  productor!: Productor;

  constructor(public productorService: ProductorService,
    public storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getCurrentUser();

    this.productorService.getByID(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      console.log(respose);
      this.productor = respose.data;
    }).catch(error => {
      console.log('silobolsa invalida');
    });
  }

}
