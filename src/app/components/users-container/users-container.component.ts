import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})
export class UsersContainerComponent implements OnInit {
  page:number = 0;
  private readonly rowPerPage: 7 = 7;
  title: string = 'Ingrese un usuario';
  showLoading:boolean = false;
  users:User[] = [];
  usersToRender:User[] = []

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.setLoading();
    this.userService.getUsers()
      .subscribe( {
          next:users => {
            if(users){
              this.closeLoading();
            }
            this.users = [...users];
            window.sessionStorage.setItem('users', JSON.stringify(this.users));
            this.setUserArray();
          },
          error: err => {
            let provitionalInfo: string | any = window.sessionStorage.getItem('users');
            this.users = JSON.parse(provitionalInfo);
            this.setUserArray();
            this.closeLoading();
            alert('En estos momentos exiten problemas para conectar con el servidor, intentelo mas tarde')
            console.log(err)
          }
      })
  }

  setUserArray(){
    debugger
    this.usersToRender = this.users.slice(this.page*this.rowPerPage,this.rowPerPage*(this.page + 1) )

  }
  
  setLoading(){
    this.showLoading = true;
  }
  closeLoading(){
    this.showLoading = false;
  }

  addUser(user:User): void {
    this.users.push(user);
    this.setUserArray();
  }

  updatePage(action:number){
    const totalUsers =  Math.ceil(this.users.length/this.rowPerPage) - 1
    if((this.page + action) < 0 || (this.page + action) > totalUsers ) return;
    this.page = this.page + action;
    this.setUserArray();
  }

  updateUsersUpdated(obj:any){
    this.users = this.users.map(user => {
      if(user._id === obj.userId){
        let {_id, __v, ...rest } = user;
        rest = obj.user;
        user = {_id,__v,...rest}
      }
      return user;
    })
  }
  updateUsersDeleted(userId:string){
    this.users = this.users.filter(user => user._id !== userId);
  }

}
