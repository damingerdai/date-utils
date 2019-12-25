import { logger } from './logger';

export function format(date: string | number | Date, fmt = 'yyyy-MM-dd'): string {
    date = new Date(date);

    const o: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

export function addDay(date: string | number | Date, days: number) {
    const d = new Date(date);
    if (days && days !== 0) {
        d.setDate(d.getDate() + days);
    } else {
        logger('days未正确传值');
    }

    return d;
}

export function addMonth(date: string | number | Date, months: number) {
    const d = new Date(date);
    if (months && months !== 0) {
        d.setMonth(d.getMonth() + months);
    } else {
        logger('months未正确传值');
    }

    return d;
}

export function addYear(date: string | number | Date, years: number) {
    const d = new Date(date);
    if (years && years !== 0) {
        d.setFullYear(d.getFullYear() + years);
    } else {
        logger('years未正确传值');
    }

    return d;
}
