import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <input class="wrapper" type="text" [placeholder]="placeholder" [formControl]="control" />
    `,
    styles: [
        `
            :host {
                .wrapper {
                    max-width: 400px;
                    width: 100%;
                    padding: 1rem 1rem;
                    border: 2px solid gray;
                    border-radius: 1rem;
                    font-size: 1rem;
                }
            }
        `,
    ],
})
export class InputComponent {
    @Input() placeholder: string = 'Search...';
    @Input() control: FormControl<string | null> = new FormControl('');
}
