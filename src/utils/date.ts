import * as Moment from 'moment';

export const formatDate = (date: string | Date, format: string): string => {
    return Moment(date).format(format);
};