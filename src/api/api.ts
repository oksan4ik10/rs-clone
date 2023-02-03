
const baseApiEndpoint = 'http://localhost:3000/api/';
const basePaths = {
  books: `${baseApiEndpoint}books/`,
}

export class BooksAPI {
  static apiEndpoint = basePaths.books;

  // получаем массив из всех книг. пример использования:
  // BooksAPI.getAllBooks().then(data => console.log(data));
  static async getAllBooks(): Promise<void | Response> {
    try {
      const response = await fetch(this.apiEndpoint);
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return console.log(error.message);
      }
    } 
  }

  // получаем одну книгу по её ID. пример использования:
  // BooksAPI.getBookById("63dbd4fe942b52bc2a107c5d").then(data => console.log(data))
  static async getBookById(id: string): Promise<void | Response> {
    try {
      const response = await fetch(`${this.apiEndpoint}${id}`);
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return console.log(error.message);
      }
    } 
  }
}
