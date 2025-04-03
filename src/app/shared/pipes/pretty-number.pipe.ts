import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'prettyNumber',
    standalone: true,
})
export class PrettyNumberPipe implements PipeTransform {
    transform(value: number | null | undefined, decimalPlaces: number = 1): string {
        if (value == null || isNaN(value)) return '-';

        const num = Number(value);

        if (num > 1000000) {
            return `${(num / 1000000).toFixed(decimalPlaces)}M`;
        }
        if (num > 1000) {
            return `${(num / 1000).toFixed(decimalPlaces)}K`;
        }
        return num.toString();
    }
}
