import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'prettyDependenciesCount',
    standalone: true,
})
export class PrettyDependenciesCountPipe implements PipeTransform {
    transform(count: number | null | undefined): string {
        if (count == null || isNaN(count)) return 'No dependencies';

        if (count === 0) return 'No dependencies';
        if (count === 1) return '1 dependency';

        return `${count} dependencies`;
    }
}
