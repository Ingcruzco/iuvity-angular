import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() users:User[] = [];
  @Input() pageNumber:number=0;
  @Output() pageEvent = new EventEmitter<number>();

  previousPage(){
    this.pageEvent.emit(-1);
  }

  nextPage(){
    this.pageEvent.emit(1);
  }
}
