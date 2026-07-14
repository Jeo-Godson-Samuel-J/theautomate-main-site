export interface PlanFeature {
    title: string;
    included: boolean;
}

export interface Plan {
    _id: string;
    title: string;
    badge: string;
    price: number;
    rating: number;
    reviewCount: number;
    duration: string;
    batchOptions: string[];
    coverImage: any;
    features: PlanFeature[];
}