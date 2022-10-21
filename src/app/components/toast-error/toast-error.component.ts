import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  templateUrl: './toast-error.component.html',
  styleUrls: ['./toast-error.component.scss']
})
export class ToastErrorComponent implements OnInit {
  private readonly timer:number = 3000;

  @Output() closeEventToast = new EventEmitter<boolean>();

  ngOnInit(): void {
    setTimeout(() => {
      this.closeEventToast.emit();
    }, this.timer)
  }

}
