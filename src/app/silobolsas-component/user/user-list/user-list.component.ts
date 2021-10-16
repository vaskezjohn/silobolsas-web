import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User} from '../models/user.model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [new User('Molinos', 'molinos@molinos.com'),
  new User('Rosario', 'rosario@rosario.com') 
  ]; 

  displayedColumns: string[] = ['usuario', 'email', 'operations'];
  dataSource!: MatTableDataSource<User>;
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }

  deleteCustomer(user: string){

  }

  editCustomer(user: string){
  }

  newUser() {
    
  }

}
