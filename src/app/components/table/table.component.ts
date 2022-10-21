import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, UserForm } from '../../interfaces'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  userId:string = '';
  open:boolean = false;
  openConfirmation: boolean = false
  openToast:boolean = false;
  opentToastError:boolean = false;

  userToDelete: User = {
    _id: '',
    name:'',
    lastName:'',
    email:'',
    phoneNumber:0,
    cc:0,
    __v: 0
  }
  userForm:UserForm = {
    name:'',
    lastName:'',
    email:'',
    phoneNumber:0,
    cc:0,
  }
  @Input() users: User[] = [];
  @Output() updateEvent = new EventEmitter<{userId:string,user:UserForm}>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  deleteUser(del:boolean):void {
    if(del){
      this.userService.deleteUser(this.userToDelete._id).subscribe({
        next:res => {
          this.users = this.users.filter(user => user._id !== this.userId)
          this.openToast = true;
          this.deleteEvent.emit(this.userToDelete._id)
        },
        error: err => {
          this.opentToastError = false;
        }
      })
    }
    this.openConfirmation = false;
  }

  openModal(user:User):void{
    this.userId = user._id;
    this.userForm = user;
    this.open = true;
  }

  closeModal(){
    this.open = false;
  }

  updateUserList(userToUpdate:UserForm){
    this.users = this.users.map(user =>{
      if(user._id === this.userId ){
        let {_id, __v, ...rest } = user;
        rest = userToUpdate;
        user = {_id,__v,...rest}
      }      
      return user;
    })
    this.updateEvent.emit({userId:this.userId,user:userToUpdate});
  }

  openModalConfirmation(user:User){
    this.userId = user._id;
    this.userToDelete = user;
    this.openConfirmation = true;
  }

  closeToast(){
    this.openToast = false;
    this.opentToastError = false;
  }


}
