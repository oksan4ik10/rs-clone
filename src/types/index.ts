export const enum PageIds {
    MainPage = 'main-page',
    PersonalArea = 'personal-area',
    DescriptionPage = 'description-book',
    Random = 'random',
    About = 'about',
}

export interface IOneBook {
    author: string;
    desc: string;
    genre: string;
    img: string;
    title: string;
    year: number;
    _id: string;
    raiting: number;
}

export interface IUserNew {
    email: string,
    name: string,
    password: string
}

export interface IOneReview {
    _id: string;
    bookId: string;
    userId: string;
    text: string;
    date: string;
    __v: number;
    userImg: string;
    userName: string;
}

export interface IOptions {
    year: 'numeric';
    month: 'long';
    day: 'numeric';
}

export interface IUser {
    email: string,
    password: string
}

export interface IGetGradeByUserRespGood {
    _id: string;
    bookId: string;
    userId: string;
    value: number;
    __v: number;
} 

export interface IGetGradeByUserResp {
    json(): Promise<IGetGradeByUserRespGood>;
    message?: string;
    status: number;
    ok?: boolean;
}

export interface ICheckBookReadStatus {
    json(): Promise<{
        status: string | boolean;
    }>;
    status: number;
}

export interface ICheckBooksLikeRead {
    json(): Promise<{
        status: string;
    }>
}

export interface IPostGrade {
    json(): Promise<IOneBook>;
    status: number;
}

export interface IAddBooksRead  {
    bookId: string,
}
export interface IUserUpdate{
    name: string,
    img: string
}

export interface IGenre{
    genre?:string;
}

export interface IUserResetPassword{
    resetLink:string, 
    newPass: string 
}