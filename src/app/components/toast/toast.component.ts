import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  private readonly timer:number = 3000;
  
  @Output() closeEventToast = new EventEmitter<boolean>();

  ngOnInit(): void {
    setTimeout(() => {
      this.closeEventToast.emit();
    }, this.timer)
  }
}
