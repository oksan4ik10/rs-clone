import Component from "../../templates/components";

export class OneReview extends Component {
  currentBookId: string;
  bookIndex: number;

  constructor (tagName: string, clasName: string, currentBookId: string, bookIndex: number) {
    super(tagName, clasName)
    this.currentBookId = currentBookId;
    this.bookIndex = bookIndex;
  }

  render(){
    

    return this.container;
  }
}

