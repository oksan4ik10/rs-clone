import { IOneBook, IOneReview, IUserNew, IUser, IGetGradeByUserResp, ICheckBooksLikeRead, IPostGrade, IAddBooksRead} from "../types";


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

  static async getBestBooks() {
    const response = await fetch(`${this.apiEndpoint}/best/list`);
    
      const result:[] = await response.json();
      return result;
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

  //Проверка есть ли книга у пользователя в хочу прочитать или прочитанное
  static async checkBooksLikeRead(bookId: string, token: string) {
    const response: ICheckBooksLikeRead = await fetch(`${this.apiEndpoint}booksCheck/${bookId}`, {
      headers: {
        "Authorization": token,
      }
    })
    return (await response.json()).status;
  }

  //Добавление книги в прочитанное
  static async addBooksRead(bookId: string, token: string) {
    const bookParam = {
      bookId: bookId
    }

    const response = await fetch(`${this.apiEndpoint}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      body: JSON.stringify(bookParam),
    });
    const result = await response.json();
    return result;
  }

  //Удаление книги из прочитанного
  static async removeBooksRead(bookId: string, token: string) {
    const bookParam = {
      bookId: bookId
    }

    const response = await fetch(`${this.apiEndpoint}/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      body: JSON.stringify(bookParam),
    });
    const result = await response.json();
    return result;
  }

  //добавление книги в желаемые к прочтению
  static async addBooksWantRead(bookId: string, token: string) {
    const bookParam = {
      bookId: bookId
    }

    const response = await fetch(`${this.apiEndpoint}/booksLike`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      body: JSON.stringify(bookParam),
    });
    const result = await response.json();
    return result;
  }

  //Удаление книги из желаемых к прочтению
  static async removeBooksWantRead(bookId: string, token: string) {
    const bookParam = {
      bookId: bookId
    }

    const response = await fetch(`${this.apiEndpoint}/booksLike/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      body: JSON.stringify(bookParam),
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

  static async postNewReview(text: string, bookId: string, token: string){
    const reviewParams = {
      bookId,
      text
    }

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(reviewParams),
    })

    if (response.status === 200){
      return await response.json();
    }
  }

  // получаем отзыв пользователя по книге

  static async getReviewsByUser(token: string, bookId: string){
    const response = await fetch(`${this.apiEndpoint}user/${bookId}`, {
      method: "GET",
      headers: {
        'Authorization': token, 
      },
    })

    if (response.status === 200){
      const result = await response.json();
      return result;
    } else {
      return null;
    }
  }
}


export class GradesAPI {
  static apiEndpoint = basePaths.grades;

  // получаем оценку пользователя по книге
  static async getGradeByUser(userId: string, bookId: string) {
    const userParam = {
      userId: userId,
      bookId: bookId
    }
    const response: IGetGradeByUserResp = await fetch(`${this.apiEndpoint}user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userParam),
    })

    if (response.status === 200){
      const result = await response.json();
      return result.value;
    }

    return null;
  }

  static async postGrade(grade: number, bookId: string, token: string) {
    const gradeParams = {
      bookId: bookId,
      value: grade
    }
    
    const response: IPostGrade = await fetch (`${this.apiEndpoint}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(gradeParams)
    })

    if (response.status === 200){
      return (await response.json()).raiting;
    }
  }

  static async deleteMyRating(bookId: string, token: string){
    const response = await fetch(`${this.apiEndpoint}${bookId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": token
      }
    })

    if (response.status === 200){
      return await response.json();
    }
  }
}

