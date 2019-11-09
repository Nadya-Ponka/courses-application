import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { CourseItem } from '../../shared/models/course';

@Directive({
  selector: '[appBorder]'
})

export class BorderDirective implements OnChanges {

  constructor(private el: ElementRef) {}

  @Input() item: CourseItem;

  ngOnChanges() {
    const today = new Date();
    const twoWeek = new Date();
    twoWeek.setDate(today.getDate() - 14);

    const childElement = this.el.nativeElement.querySelector('.row');
    if (this.item.creationDate < today && this.item.creationDate > twoWeek) { childElement.style.border = '1px solid green'; }
    if (this.item.creationDate > today) { childElement.style.border = '1px solid blue'; }
  }

}
