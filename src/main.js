export function format(date, fmt) {
    if (!fmt) {
        fmt = 'yyyy-MM-dd';
    }
    date = new Date(date);
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }

    }
    return fmt;
}

export function addDay(date, days) {
    const d = new Date(date);
    if (days) {
        d.setDate(d.getDate() + days);
    } 
    return d;
}

export function addMonth(date, months) {
    const d = new Date(date);
    if (months) {
        d.setMonth(d.getMonth() + months);
    }
    return d;
}

export function addYear(date, years) {
    const d = new Date(date);
    if (years) {
        d.setFullYear(d.getFullYear() + years);
    }
    return d;
}