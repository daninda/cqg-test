import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <button class="wrapper" type="button" (click)="click()"><ng-content></ng-content></button>
    `,
    styles: [
        `
            :host {
                .wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    border-radius: 1rem;
                    border: 2px solid gray;
                }
            }
        `,
    ],
})
export class ButtonComponent {
    @Output() onClick = new EventEmitter<void>();

    click() {
        this.onClick.emit();
    }
}
