import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ceil',
    pure: false
})
export class CeilNumberPipe implements PipeTransform {
    transform(value: number): number {
        return Math.ceil(value);
    }
}  