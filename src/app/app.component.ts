import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: '<router-outlet></router-outlet>',
    styles: [
        `
            :host {
                display: flex;
                justify-content: center;
                max-width: 1440px;
                width: 100%;
                margin: 0 auto;
                padding: 0 2rem;
            }
        `,
    ],
})
export class AppComponent {}
