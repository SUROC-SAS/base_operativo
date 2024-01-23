import moment from 'moment';
import { units } from '#/domain/interfaces';

interface Moment {
  addTimes(amount: number, unit: units): Date;
}

export class MomentAdapter implements Moment {
  addTimes(amount: number, unit: units) {
    return moment.utc().add(amount, unit) as unknown as Date;
  }
}