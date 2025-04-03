export interface Package {
    id: string;
    weeklyDownloads: number;
    dependencyCount: number;
}

export type Dependency = string;
