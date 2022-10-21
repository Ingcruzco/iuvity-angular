import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces';


@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.scss']
})
export class ConfirmationFormComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() confirmEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete(): void{
    this.confirmEvent.emit(true);
  }

  abortDelete() {
    this.confirmEvent.emit(false);
  }

}
