import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'floor',
    pure: false
})
export class FloorNumberPipe implements PipeTransform {
    transform(value: number): number {
        return Math.floor(value);
    }
}  