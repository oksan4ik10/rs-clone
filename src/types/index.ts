export const enum PageIds {
    MainPage = 'main-page',
    PersonalArea = 'personal-area',
    DescriptionPage = 'description-book',
    Sign = 'description-book',
}

export interface IOneBook {
    author: string;
    desc: string;
    genre: string;
    img: string;
    title: string;
    year: number;
    _id: string;
    raiting?: number;
}
export interface IUserNew{
    email: string,
    name: string,
    password: string
}