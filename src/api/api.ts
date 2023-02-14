import { IOneBook, IOneReview, IUserNew, IUser, IGetGradeByUserResp, ICheckBooksLikeRead, IPostGrade, IUserUpdate, IGenre} from "../types";


const baseApiEndpoint = 'https://rs-clone-iqcn.onrender.com/api/';
const basePaths = {
  books: `${baseApiEndpoint}books/`,
  reviews: `${baseApiEndpoint}reviews/`,
  users: `${baseApiEndpoint}users/`,
  grades: `${baseApiEndpoint}grades/`,
}

export class BooksAPI {
  static apiEndpoint = basePaths.books;

  static async getAllBooks(): Promise<IOneBook[]> {
      return await fetch(this.apiEndpoint)
      .then(response => response.json());
  }

  static async getBookById(id: string): Promise<IOneBook> {
    return await fetch(`${this.apiEndpoint}${id}`)
      .then(response => response.json());
  }

  static async getBestBooks() {
    const response = await fetch(`${this.apiEndpoint}best/list`);
    const result:[] = await response.json();
    return result;
  }

  static async getRandomBooks(genre?: string) {
    const obj:IGenre= {};
    if (genre) obj['genre'] = genre;
    const response = await fetch(`${this.apiEndpoint}random/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    const result: IOneBook = await response.json();
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

  //загрузка аватарки
  static async getAvatar(files:FormData, token:string){
    const response = await fetch(`${this.apiEndpoint}avatar`, {
      method: "POST",
      headers: {
        'Authorization': token
      },
      body: files,
    });
    try{
      const result = await response.json();
      console.log(result);
      return result;
    } catch{
      return;
    }
  }

  static async userUpdate(obj:IUserUpdate, token: string) {
    const response = await fetch(`${this.apiEndpoint}update`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      body: JSON.stringify(obj),
    });
    try{
      const result = await response.json();
      return result;
    }catch{
      return;
    }
  }
}

export class ReviewsAPI {
  static apiEndpoint = basePaths.reviews;

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

  // проверка есть ли рецензия у пользователя на книгу
  static async hasUserReview(bookId: string, token: string) {
    const response = await fetch(`${this.apiEndpoint}check/${bookId}`, {
      headers: {
        "Authorization": token
      }
    })

    if (response.status === 200){
      return (await response.json()).status;
    }

  }

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
  static async getLastReviews(){
    const response = await fetch(`${this.apiEndpoint}last`);

    if (response.status === 200){
      return await response.json();
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

