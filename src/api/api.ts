import { IOneBook, IOneReview, IUserNew, IUser, IGetGradeByUserResp} from "../types";


const baseApiEndpoint = 'http://localhost:3000/api/';
const basePaths = {
  books: `${baseApiEndpoint}books/`,
  reviews: `${baseApiEndpoint}reviews/`,
  users: `${baseApiEndpoint}users/`,
  grades: `${baseApiEndpoint}grades/`,
}

export class BooksAPI {
  static apiEndpoint = basePaths.books;

  // получаем массив из всех книг. пример использования:
  // BooksAPI.getAllBooks().then(data => console.log(data));
  static async getAllBooks(): Promise<IOneBook[]> {
      return await fetch(this.apiEndpoint)
      .then(response => response.json())
      .catch(error => console.log(error.message));
  }

  // получаем одну книгу по её ID. пример использования:
  // BooksAPI.getBookById("63dbd4fe942b52bc2a107c5d").then(data => console.log(data))
  static async getBookById(id: string): Promise<IOneBook> {
    return await fetch(`${this.apiEndpoint}${id}`)
      .then(response => response.json())
      .catch(error => console.log(error.message));
  }

}

export class UsersAPI{
  static apiEndpoint = basePaths.users;
  static async createUser(obj: IUserNew) {
    const response = await fetch(`${baseApiEndpoint}\\login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    const result = await response.json();
    return result;
  }

  static async authUser(obj:IUser) {
    const response = await fetch(`${baseApiEndpoint}\\auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    
      const result = await response.json();
      return result;
  }
  
  static async infoUser(token:string) {
    const response = await fetch(`${this.apiEndpoint}/personal`, {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    });
  
      const result = await response.json();
      return result;

  }
}

export class ReviewsAPI {
  static apiEndpoint = basePaths.reviews;

  // получаем массив из всех отзывов
  // отзыв есть у книги "bookId": "63dbd4fe942b52bc2a107c35",
  static async getAllReviews(bookId: string): Promise<Array<IOneReview>> {
    return await fetch(`${this.apiEndpoint}book/${bookId}`)
    .then(response => response.json());
  }
}

export class GradesAPI {
  static apiEndpoint = basePaths.grades;

  // получаем оценку пользователя по книге
  static async getGradeByUser(userId: string, bookId: string) {
    const userParam = {
      userId: userId
    }
    const response: IGetGradeByUserResp = await fetch(`${this.apiEndpoint}${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userParam),
    })

    if (response.status === 200){
      return (await response.json()).value;
    }

    return null;
  }
}

