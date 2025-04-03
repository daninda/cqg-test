import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependency, Package } from './packages.types';

@Injectable({
    providedIn: 'root',
})
export class PackagesService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Package[]> {
        return this.http.get<Package[]>('packages');
    }

    getById(id: string) {
        return this.http.get<Package>(`packages/${id}`);
    }

    getDependenciesById(id: string) {
        return this.http.get<Dependency[]>(`packages/${id}/dependencies`);
    }
}
