import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { PackageCardItem } from './package-card.types';
import { NgClass } from '@angular/common';
import { PrettyNumberPipe } from '../../pipes/pretty-number.pipe';
import { PrettyDependenciesCountPipe } from '../../pipes/pretty-dependencies-count.pipe';

@Component({
    selector: 'app-package-card',
    standalone: true,
    imports: [NgClass, PrettyNumberPipe, PrettyDependenciesCountPipe],
    template: `
        <div
            class="wrapper"
            [ngClass]="{ 'hover-dependency': package.isHoveredDependency }"
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
        >
            <div class="title">
                <h1 class="id">
                    <span class="first-part">{{ partsOfId.first }}</span
                    >{{ partsOfId.second }}
                </h1>
            </div>
            <div class="info">
                <p class="downloads">Downloads: {{ package.weeklyDownloads | prettyNumber }}</p>
                <p class="dependencies">{{ package.dependencyCount | prettyDependenciesCount }}</p>
            </div>
        </div>
    `,
    styles: [
        `
            .wrapper {
                border: 2px solid gray;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                cursor: pointer;

                &:hover {
                    .title {
                        background-color: lightblue;
                    }
                }

                &.hover-dependency {
                    .title {
                        background-color: lightcoral;
                    }
                }

                .title {
                    padding: 1rem;
                    border-bottom: 2px solid gray;
                    transition: background-color 0.2s;

                    .id {
                        font-weight: bold;
                        font-size: 1rem;

                        .first-part {
                            color: green;
                        }
                    }
                }

                .info {
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem;

                    .downloads {
                        font-weight: bold;
                    }

                    .dependencies {
                        color: gray;
                    }
                }
            }
        `,
    ],
})
export class PackageCardComponent {
    @Input() package!: PackageCardItem;

    @Output() onHoverItem = new EventEmitter<PackageCardItem>();
    @Output() onUnHoverItem = new EventEmitter<PackageCardItem>();

    onMouseEnter() {
        this.onHoverItem.emit(this.package);
    }

    onMouseLeave() {
        this.onUnHoverItem.emit(this.package);
    }

    public get partsOfId() {
        const splitted = this.package.id.split('/');

        if (splitted.length < 2) {
            return {
                first: null,
                second: this.package.id,
            };
        }

        return {
            first: splitted[0],
            second: `/${splitted[1]}`,
        };
    }

    public getSecondPartOfId(id: string) {
        return id.split('/')[1];
    }
}
