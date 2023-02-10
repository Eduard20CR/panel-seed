import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiblingsComunicationService {
  emitActualPath = new Subject<string>();

  constructor() {}

  // SUBJECTS
  onEmitActualPath(path: string) {
    this.emitActualPath.next(path);
  }
}
