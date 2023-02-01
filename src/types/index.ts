export const enum PageIds {
    MainPage = 'main-page',
    PersonalArea = 'personal-area',
    DescriptionPage = 'description-book',
    Sign = 'description-book',
}

export interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    textContent?: string;
    thumbnail: string;
    title: string;
    num?: number;
}


