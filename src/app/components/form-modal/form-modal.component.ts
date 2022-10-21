import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  userForm:FormGroup; 
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  title: string = 'Actualizar Usuario';
  open:boolean = false;
  openToast:boolean = false;
  opentToastError:boolean = false;

  @Input() userId:string ='';
  @Input() widthStyle: string = '250px';
  @Input()  set userSelected(user: UserForm) {
    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['lastName'].setValue(user.lastName);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['phoneNumber'].setValue(user.phoneNumber);
    this.userForm.controls['cc'].setValue(user.cc); 
  }
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() updateListEvent = new EventEmitter<UserForm>();

  get name() { return this.userForm.get('name'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get phoneNumber() { return this.userForm.get('phoneNumber'); }
  get cc() { return this.userForm.get('cc'); }

  constructor(private userService:UserService) {
    this.userForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      lastName: new FormControl('',[Validators.required,Validators.maxLength(15)]),
      email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(15)]),
      cc: new FormControl(undefined,[Validators.required, Validators.minLength(7),Validators.maxLength(10)])
    })
  }

  updateUser(){
    this.userService.updateUser(this.userId, this.userForm.value)
      .subscribe({
        next: res => {
          this.updateListEvent.emit(this.userForm.value);
          this.closeEvent.emit(false);
        },
        error: err =>{
          console.log(err)
        }
      })
  }
  closeModal():void{
    this.closeEvent.emit();
  }

}
