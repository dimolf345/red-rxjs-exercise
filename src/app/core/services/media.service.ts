import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor() {}

  observeMediaQuery(
    queryType: 'min-width' | 'max-width',
    pixels: number
  ): Observable<boolean> {
    const query = `(${queryType}: ${pixels}px)`;
    const mql = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mql, 'change').pipe(
      startWith(mql),
      map((list: MediaQueryList) => list.matches)
    );
  }
}
