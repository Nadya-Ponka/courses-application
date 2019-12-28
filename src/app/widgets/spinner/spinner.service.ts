import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private visible = new Subject();

  constructor() {
    this.visible.pipe().subscribe({
      next: (isShown: boolean) => isShown
    });
  }

  isVisible() {
    return this.visible;
  }

  hide(): void {
    this.visible.next(false);
  }

  show(): void {
    this.visible.next(true);
  }
}
