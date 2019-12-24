// import { logger } from './logger';

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
    d.setDate(d.getDate() + days);

    return d;
}

export function addMonth(date: string | number | Date, months: number) {
    const d = new Date(date);
    d.setMonth(d.getDate() + months);

    return d;
}

export function addYear(date: string | number | Date, years: number) {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);

    return d;
}
