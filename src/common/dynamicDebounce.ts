import { delayWhen, filter, Subject, tap, timer } from 'rxjs';

export class DynamicDebounce {
  private subject = new Subject<number>();
  constructor(callback: () => void, onNext?: () => void) {
    let counter = 0;
    this.subject.asObservable().pipe(
      tap(() => counter++),
      tap(() => onNext?.()),
      // debounce((value: number) => timer(value)),
      delayWhen((value: number) => timer(value)),
      filter(() => --counter == 0),
      //   {
      //     tap(() => {
      //       if(--counter == 0)
      // callback();
      // }
      // ),
      // ).subscribe(() => callback());
    ).subscribe(() => callback());
  }

  public next(time: number) {
    this.subject.next(time);
  }
}
