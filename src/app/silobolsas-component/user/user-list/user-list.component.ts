import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserNewComponent } from '../user-new/user-new.component'
import { User } from '../models/user.model';
import { Userervice } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] =[]; 

  displayedColumns: string[] = ['usuario', 'email', 'operations'];
  dataSource!: MatTableDataSource<User>;
  constructor(public dialog: MatDialog, public userervice: Userervice) { }

  ngOnInit(): void {
    this.userervice.userList().toPromise().then((respose: any) => {        
      respose.forEach((item: any) => this.users.push(new User(item.nombre, item.usuario)));
      this.dataSource = new MatTableDataSource(this.users);
    }).catch(error => {
      console.log('Error al obtener los usuario'); 
    });
    
  }

  deleteUser(user: string){

  }

  editUser(user: string){
  }

  newUser() {
    const dialogRef = this.dialog.open(UserNewComponent, {
      data: new User('', '')
    });
    dialogRef.afterClosed().subscribe(user => {
      if (user != undefined)
        this.addUser(user);
    });
  }

  addUser(user: User) {
    this.users.push(new User(user.nombre, user.email));
    this.dataSource.data = this.users;
  }

  detailsUser(user: string) {

  }

}
