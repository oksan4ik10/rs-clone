import { BooksAPI, GradesAPI } from "../../../api/api";
import { IOneReview, IOptions } from "../../../types";
import Component from "../../templates/components";

export class OneReview extends Component {
  currentBookId: string;
  i: number;
  allReviews: IOneReview[];

  constructor (tagName: string, clasName: string, allReviews: IOneReview[], currentBookId: string, bookIndex: number) {
    super(tagName, clasName)
    this.currentBookId = currentBookId;
    this.i = bookIndex;
    this.allReviews = allReviews;
  }

  async getGradeByUser(){
    return await GradesAPI.getGradeByUser(this.allReviews[this.i].userId, this.allReviews[this.i].bookId).then(async grade => {
      if (grade) {
        return grade;
      } 
      return 0;
    })
  }

  createOneReview() {
    const oneReviewWrapper = document.createElement('div');
    oneReviewWrapper.classList.add('decr__onereiew__wrapper');

    const oneReviewHeader = document.createElement('div');
    oneReviewHeader.classList.add('desc__review__header');

    const reviewUserImage = document.createElement('img');
    reviewUserImage.classList.add('desc__review__img');
    reviewUserImage.alt = "";
    reviewUserImage.src = this.allReviews[this.i].userImg;

    const reviewNameDateWrapper = document.createElement('div');
    reviewNameDateWrapper.classList.add('desc__review__namedatewrap');
    const reviewName = document.createElement('div');
    reviewName.classList.add('desc__review__name');
    reviewName.textContent = this.allReviews[this.i].userName;
    const reviewDate = document.createElement('div');
    reviewDate.classList.add('desc__review__date');
    const date = new Date(this.allReviews[this.i].date);
    const options: IOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    reviewDate.textContent = `написал(а) ${date.toLocaleDateString("ru-RU", options)}`;

    const reviewRatingWrapper = document.createElement('div');
    reviewRatingWrapper.classList.add('desc__review__ratingwrap');
    const reviewRatingText = document.createElement('span');
    reviewRatingText.classList.add('desc__review__ratingtext');
    const reviewRatingNumber = document.createElement('span');
    reviewRatingNumber.classList.add('desc__review__ratingnumber');
    
    // рисуем звёздочки и рейтинг, если он есть
    const reviewRatingStars = document.createElement('div');
    reviewRatingStars.classList.add('desc__review__ratingstars');

    this.getGradeByUser().then((grade) => {
      const goldenStartNumber = grade;

      for (let j = 0; j < 10; j++) {
        const inputElement = document.createElement('span');
        inputElement.id = `therating-${j}`;
        if (goldenStartNumber > j){
            inputElement.classList.add('golden');
        }

        reviewRatingStars.append(inputElement);
      }

      if (goldenStartNumber > 0) {
          reviewRatingNumber.textContent = `${goldenStartNumber}/10`;
          reviewRatingText.textContent = 'Оценка:';
      }
    })

    // продолжаем тело отзывов
    const oneReviewBody = document.createElement('div');
    oneReviewBody.classList.add('desc__review__body');

    const oneReviewBodyHeader = document.createElement('div');
    oneReviewBodyHeader.classList.add('desc__review__bodyhead');
    const oneReviewBodyText = document.createElement('div');
    oneReviewBodyText.classList.add('desc__review__bodytext');
    oneReviewBodyText.textContent = this.allReviews[this.i].text;

    const reviewBookImg = document.createElement('img');
    reviewBookImg.classList.add('desc__review__bookimg');
    reviewBookImg.alt = "";

    const reviewBookTitleAuthor = document.createElement('div');
    const reviewBookTitle = document.createElement('div');
    const reviewBookAuthor = document.createElement('div');

    BooksAPI.getBookById(this.currentBookId).then(bookInfo => {
        reviewBookTitle.textContent = bookInfo.title;
        reviewBookAuthor.textContent = bookInfo.author;
        reviewBookImg.src = bookInfo.img;
    });
    

    reviewNameDateWrapper.append(reviewName, reviewDate);
    reviewRatingWrapper.append(reviewRatingText, reviewRatingStars, reviewRatingNumber);
    oneReviewHeader.append(reviewUserImage, reviewNameDateWrapper, reviewRatingWrapper);
    reviewBookTitleAuthor.append(reviewBookTitle, reviewBookAuthor);
    oneReviewBodyHeader.append(reviewBookImg, reviewBookTitleAuthor),
    oneReviewBody.append(oneReviewBodyHeader, oneReviewBodyText);
    oneReviewWrapper.append(oneReviewHeader, oneReviewBody);
    return oneReviewWrapper;
  }

  render() {
    this.container.append(this.createOneReview());

    return this.container;
  }
}

