import Page from "../../core/templates/page";
import anime from 'animejs/lib/anime.es.js';

export default class AboutPage extends Page {
  person1Wrapper: HTMLDivElement;
  person2Wrapper: HTMLDivElement;
  person3Wrapper: HTMLDivElement;

    constructor(id: string) {
        super(id);
        this.person1Wrapper = document.createElement('div');
        this.person2Wrapper = document.createElement('div');
        this.person3Wrapper = document.createElement('div');
    }

    createAnimatedPhotos() {
      const animationWrapper = document.createElement('div');
      animationWrapper.classList.add('aboutpage__anim__wrap');

      this.person1Wrapper.classList.add('aboutpage__person1__wrapper', 'person__wrapper');
      const person1InnerWrapper = document.createElement('div');
      person1InnerWrapper.classList.add('about__person__innerwrap');
      const person1Name = document.createElement('div');
      person1Name.classList.add('about__person__name');
      person1Name.textContent = 'Оксана';
      const person1Image = document.createElement('img');
      person1Image.classList.add('about__person__image');
      person1Image.src = './images/girl.png';
      const person1Motto = document.createElement('div');
      person1Motto.classList.add('about__person__motto');
      person1Motto.textContent = 'Прирождённый секьюр-профи - храню токен в localStorage';
      const person1Info = document.createElement('div');
      person1Info.classList.add('about__person__info');
      person1Info.textContent = 'Пурум пум пум пурум пум пум пурум пум пум пурум пум пум. Пурм пурум пурум парарарарам! Пурум парам-пам-пам.'
      person1InnerWrapper.append(person1Name, person1Image, person1Motto, person1Info);
      this.person1Wrapper.append(person1InnerWrapper);

      this.person2Wrapper.classList.add('aboutpage__person2__wrapper', 'person__wrapper');
      const person2InnerWrapper = document.createElement('div');
      person2InnerWrapper.classList.add('about__person__innerwrap');
      const person2Name = document.createElement('div');
      person2Name.classList.add('about__person__name');
      person2Name.textContent = 'Настя';
      const person2Image = document.createElement('img');
      person2Image.classList.add('about__person__image');
      person2Image.src = './images/girl.png';
      const person2Motto = document.createElement('div');
      person2Motto.classList.add('about__person__motto');
      person2Motto.textContent = 'Могу рассказать, как войти в айти и не выйти из рассудка';
      const person2Info = document.createElement('div');
      person2Info.classList.add('about__person__info');
      person2Info.textContent = 'Пурум пум пум пурум пум пум пурум пум пум пурум пум пум. Пурм пурум пурум парарарарам! Пурум парам-пам-пам.'
      person2InnerWrapper.append(person2Name, person2Image, person2Motto, person2Info);
      this.person2Wrapper.append(person2InnerWrapper);

      this.person3Wrapper.classList.add('aboutpage__person3__wrapper', 'person__wrapper');
      const person3InnerWrapper = document.createElement('div');
      person3InnerWrapper.classList.add('about__person__innerwrap');
      const person3Name = document.createElement('div');
      person3Name.classList.add('about__person__name');
      person3Name.textContent = 'Оля';
      const person3Image = document.createElement('img');
      person3Image.classList.add('about__person__image');
      person3Image.src = './images/girl.png';
      const person3Motto = document.createElement('div');
      person3Motto.classList.add('about__person__motto');
      person3Motto.textContent = 'Рисую красивые звёздочки и пишу душевные отзывы';
      const person3Info = document.createElement('div');
      person3Info.classList.add('about__person__info');
      person3Info.textContent = 'Пурум пум пум пурум пум пум пурум пум пум пурум пум пум. Пурм пурум пурум парарарарам! Пурум парам-пам-пам.'
      person3InnerWrapper.append(person3Name, person3Image, person3Motto, person3Info);
      this.person3Wrapper.append(person3InnerWrapper);

      const person1Anime = anime({
        targets: [this.person1Wrapper, this.person2Wrapper, this.person3Wrapper],
        translateY: -100,
        translateX: 100,
        direction: 'alternate',
        delay: 2000,
        endDelay: 2000,
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
      });

      document.addEventListener('click', () => {
        console.log('clicked');
        person1Anime.restart;
      })

      animationWrapper.append(this.person1Wrapper, this.person2Wrapper, this.person3Wrapper);

      return animationWrapper;
    }

    createAboutPage() {
        const section = document.createElement('section');
        section.classList.add('wrapper');


        
        

        section.append(this.createAnimatedPhotos());
        return section;
    }

    render() {
        this.container.append(this.createAboutPage());

        return this.container;
    }
}
