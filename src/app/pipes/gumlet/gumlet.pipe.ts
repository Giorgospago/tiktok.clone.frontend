import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'gumlet'
})
export class GumletPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
        return (value || "").replace(
            'https://trick-tok.s3.eu-west-2.amazonaws.com',
            'https://tricktok.gumlet.io'
        ) + (args?.[0] || "");
    }

}
