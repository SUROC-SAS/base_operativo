import moment from 'moment';
import { TimeAdapter, units } from '#/domain/interfaces';

export class MomentAdapter implements TimeAdapter {
  addTimes(amount: number, unit: units): Date {
    return moment.utc().add(amount, unit).toDate();
  }

}