import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class NumberService {

  randomNumberGenerator(): Observable<number> {
    return Observable.of('')
      .mergeMap(() =>
        Observable
          .of(this.getRandomNumber())
          .delay(this.getRandomDelay())
      )
      .repeat();

  }

  private getRandomNumber(): number {
    return Math.round(Math.random() * 10);
  }

  private getRandomDelay(): number {
    return Math.random() * 1000;
  }

}
