import {
  Component,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Output() onSelected: EventEmitter<number> = new EventEmitter();
  @Input() characterCount: number = 0;
  pages: number[] = [];
  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    const characterCount = changes.characterCount.currentValue;
    const pageCount = Math.ceil(characterCount / 10);
    for (let i = 1; i <= pageCount; i++) this.pages.push(i);
  }

  handleClick(number: number) {
    this.currentPage = number;
    this.onSelected.emit(this.currentPage);
  }
}
