import { Component, OnInit } from '@angular/core';
import { Package } from '../../core/services/packages.types';
import { PackagesService } from '../../core/services/packages.service';
import { NgFor } from '@angular/common';
import { PackageCardComponent } from '../../shared/components/package-card/package-card.component';
import { PackageCardItem } from '../../shared/components/package-card/package-card.types';
import { debounce, delay, from, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
    selector: 'app-package-list',
    standalone: true,
    imports: [NgFor, PackageCardComponent, InputComponent, ButtonComponent],
    template: `
        <div class="tools">
            <app-input [control]="searchControl"></app-input>

            <app-button (onClick)="reset()">Reset</app-button>
        </div>
        <div class="list">
            <app-package-card
                *ngFor="let package of filteredPackages; trackBy: trackById"
                [package]="package"
                (onHoverItem)="onHoverItem($event)"
                (onUnHoverItem)="onUnHoverItem($event)"
            ></app-package-card>
        </div>
    `,
    styles: [
        `
            :host {
                width: 100%;
                padding: 1rem 0;

                .tools {
                    display: flex;
                    justify-content: space-between;
                    column-gap: 1rem;
                }

                .list {
                    padding: 1rem 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 2rem;
                }
            }
        `,
    ],
})
export class PackageListComponent implements OnInit {
    packages: PackageCardItem[] = [];
    filteredPackages: PackageCardItem[] = [];
    searchControl: FormControl<string | null> = new FormControl('');

    constructor(private readonly packagesService: PackagesService) {}

    ngOnInit(): void {
        this.initFormListeners();
        this.getAllPackages();
    }

    private initFormListeners() {
        this.searchControl.valueChanges.pipe(delay(300)).subscribe(value => {
            this.filterPackages(value);
        });
    }

    private getAllPackages() {
        this.packagesService.getAll().subscribe(packages => {
            this.packages = this.mapPackageCardItems(packages);
            this.filteredPackages = this.packages;
        });
    }

    private filterPackages(value: string | null) {
        if (value) {
            this.filteredPackages = this.packages.filter(packageItem =>
                packageItem.id.toLowerCase().includes(value.toLowerCase()),
            );
        } else {
            this.filteredPackages = this.packages;
        }
    }

    private mapPackageCardItems(packages: Package[]): PackageCardItem[] {
        return packages.map(packageItem => {
            return {
                ...packageItem,
                isHoveredDependency: false,
            };
        });
    }

    public onHoverItem(item: PackageCardItem) {
        this.packagesService.getDependenciesById(item.id).subscribe({
            next: dependencies => {
                this.packages.forEach(packageItem => {
                    packageItem.isHoveredDependency = false;
                });

                dependencies.forEach(dependency => {
                    const dependencyIndex = this.packages.findIndex(
                        packageItem => packageItem.id === dependency,
                    );
                    this.packages[dependencyIndex].isHoveredDependency = true;
                });

                console.log(this.packages.filter(packageItem => packageItem.isHoveredDependency));
            },
            error: () => {
                this.packages.forEach(packageItem => {
                    packageItem.isHoveredDependency = false;
                });
            },
        });
    }

    public onUnHoverItem(item: PackageCardItem) {
        this.packages.forEach(packageItem => {
            packageItem.isHoveredDependency = false;
        });
    }

    public reset() {
        this.getAllPackages();
        this.searchControl.patchValue(null);
    }

    trackById(index: number, item: PackageCardItem): string {
        return item.id;
    }
}
