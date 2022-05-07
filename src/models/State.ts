import { BehaviorSubject, Observable } from 'rxjs';

export class State {
  public baseCharge$ = new SubscribableValue(1);
  public sphereCharge$ = new SubscribableValue(1);

  public baseIncome$ = new SubscribableValue(1);
  public chargePlusSize$ = new SubscribableValue(1);
  public chargeMinusSize$ = new SubscribableValue(1);
}

class SubscribableValue {
  private valueSubject: BehaviorSubject<number>;
  public observable: Observable<number>;

  constructor(value: number) {
    this.valueSubject = new BehaviorSubject<number>(value);
    this.observable = this.valueSubject.asObservable();
  }
  get value() { return this.valueSubject.value; }
  public set(value: number) { this.valueSubject.next(value); }
  public increase(value: number) { this.valueSubject.next(this.valueSubject.value + value); }
}
