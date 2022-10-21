import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

import { User, UserForm} from 'src/app/interfaces';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  @Input() title: string = 'Ingrese un usuario'
  @Input() widthStyle: string = '250px'
  @Input() isModal:boolean = false;
  @Input() userForm:FormGroup; 
  @Output() newItemEvent = new EventEmitter<User>();

  get name() { return this.userForm.get('name'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get phoneNumber() { return this.userForm.get('phoneNumber'); }
  get cc() { return this.userForm.get('cc'); }

  openToast:boolean = false;
  opentToastError:boolean = false;

  constructor(private userService: UserService) {
    this.userForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      lastName: new FormControl('',[Validators.required,Validators.maxLength(15)]),
      email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      phoneNumber: new FormControl(undefined,[Validators.required, Validators.minLength(10),Validators.maxLength(15)]),
      cc: new FormControl(undefined,[Validators.required, Validators.minLength(7),Validators.maxLength(10)])
    })
  }

  addUser(): void{
    if(this.userForm.valid){
      this.userService.addUser(this.userForm.value)
        .subscribe({
          next: user => {
            this.newItemEvent.emit(user);
            this.openToast = true;
            this.userForm.reset();
          },
          error: err => {
            this.opentToastError = true;
          }
        })
    }else {
      console.log('valide todos los campos del formulario')
    }
  }

  closeToast(){
    this.openToast = false;
    this.opentToastError = false;
  }
}
