import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: 'video[appMute]'
})
export class MuteVideoDirective {

    constructor(
        private elRef: ElementRef<HTMLVideoElement>
    ) {
        this.elRef.nativeElement.volume = 0;
    }

}
