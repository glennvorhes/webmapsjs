/**
 * Created by glenn on 6/13/2017.
 */

export function stringToDate(dateStr: string): Date {
    let parts = dateStr.split('/');

    let mn = parseInt(parts[0]) - 1;
    let d = parseInt(parts[1]);
    let y = parseInt(parts[2]);

    let dte = new Date(y, mn, d);
    dte.setHours(0, 0, 0);

    return dte;
}

export function dateToString(dte: Date, zeroPad:boolean = true): string {
    let mn = (dte.getMonth() + 1).toString();
    let d = dte.getDate().toString();

    if (zeroPad){
        mn = mn.length == 1 ? '0' + mn : mn;
        d  = d.length == 1 ? '0' + d  : d ;
    }

    return `${mn}/${d}/${dte.getFullYear()}`;
}