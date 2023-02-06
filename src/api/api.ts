import { IOneBook } from "../types";
import { IUserNew } from "../types";
import { IUser } from "../types";

const baseApiEndpoint = 'http://localhost:3000/api/';
const basePaths = {
  books: `${baseApiEndpoint}books/`,
  users:`${baseApiEndpoint}users/`
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
/*
window.addEventListener("DOMContentLoaded", () => {
  BooksAPI.getBookById("63dbd4fe942b52bc2a107c5d").then(data => console.log(data))
})
*/
