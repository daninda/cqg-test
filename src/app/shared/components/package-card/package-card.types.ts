import { Package } from '../../../core/services/packages.types';

export interface PackageCardItem extends Package {
    isHoveredDependency: boolean;
}
