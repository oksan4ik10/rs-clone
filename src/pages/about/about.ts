import Page from "../../core/templates/page";
import anime from 'animejs/lib/anime.es.js';
import DescriptionPage from "../description";
import Header from "../../core/components/header";
import App from "../app";

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

    authStatus = DescriptionPage.prototype.isAuthorised();

    showRegisterPopUp() {
      if (this.authStatus === false) {
          Header.prototype.openRegistr('registration');
       }
    }

    animatePhotos() {
       const person1Anime = anime({
        targets: [this.person1Wrapper],
        keyframes: [
          {translateY: 0, translateX: 350, height: '240px', width: '380px', endDelay: 6000},
          {translateX: 0, translateY: 0, height: '110px', width: '180px', endDelay: 14000},
        ],
        duration: 1000,
        loop: true,
        easing: 'easeInOutSine'
      });

      const person2Anime = anime({
        targets: [this.person2Wrapper],
        keyframes: [
          {translateY: -130, translateX: 350, height: '240px', width: '380px', delay: 7000, endDelay: 6000},
          {translateX: 0, translateY: 0, height: '110px', width: '180px', endDelay: 7000},
        ],
        duration: 1000,
        loop: true,
        easing: 'easeInOutSine'
      });

      const person3Anime = anime({
        targets: [this.person3Wrapper],
        keyframes: [
          {translateY: -260, translateX: 350, height: '240px', width: '380px', delay: 14000, endDelay: 6000},
          {translateX: 0, translateY: 0, height: '110px', width: '180px', endDelay: 0},
        ],
        duration: 1000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    createPhotosArea() {
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
      person1Motto.textContent = 'Прирождённый секьюр-профи - храню токен в localStorage ;)';
      const person1Info = document.createElement('div');
      person1Info.classList.add('about__person__info');
      person1Info.textContent = 'Знаю про бэкенд всё, что надо знать, чтобы сделать всё, что надо сделать.';
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
      person2Motto.textContent = 'Могу рассказать, как войти в айти и не выйти из рассудка o_O';
      const person2Info = document.createElement('div');
      person2Info.classList.add('about__person__info');
      person2Info.textContent = 'Одной рукой настраиваю SCSS, второй рукой применяю RegExp, третьей рукой глажу кота.';
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
      person3Motto.textContent = 'Вам кажется, что в вашем коде нет ошибок? Тогда я иду к вам :D';
      const person3Info = document.createElement('div');
      person3Info.classList.add('about__person__info');
      person3Info.textContent = 'Подключаю библиотеки и расшифровываю тайны npm, наливая себе очередной бокал чая.'
      person3InnerWrapper.append(person3Name, person3Image, person3Motto, person3Info);
      this.person3Wrapper.append(person3InnerWrapper);

      animationWrapper.append(this.person1Wrapper, this.person2Wrapper, this.person3Wrapper);

      return animationWrapper;
    }

    creatHeaderArea() {
      const headerOuterWrapper = document.createElement('div');
      headerOuterWrapper.classList.add('about__header__outer');
      const headerMiddleWrapper = document.createElement('div');
      headerMiddleWrapper.classList.add('about__header__middle');
      const headerInnerWrapper = document.createElement('div');
      headerInnerWrapper.classList.add('wrapper');

      const redirectWrapper = document.createElement('div');
      redirectWrapper.classList.add('about__redirect__wrapper');
      const redirectText = document.createElement('span');
      redirectText.textContent = 'Не знаете, что почитать? Попробуйте страницу ';
      const redirectLink = document.createElement('span');
      redirectLink.classList.add('about__redirect__link');
      redirectLink.textContent = 'случайного выбора книги!';

      redirectLink.addEventListener('click', () => {
        window.location.hash = 'random';
      })

      redirectWrapper.append(redirectText, redirectLink);

      const pageTitle = document.createElement('div');
      pageTitle.classList.add('about__pagetitle');
      pageTitle.textContent = 'О нас';

      headerInnerWrapper.append(redirectWrapper, pageTitle);
      headerMiddleWrapper.append(headerInnerWrapper);
      headerOuterWrapper.append(headerMiddleWrapper);

      return headerOuterWrapper;
    }

    createFeaturesArea() {
      const featuresWrapper = document.createElement('div');
      featuresWrapper.classList.add('wrapper', 'about__features__wrapper');

      const featuresTitles: Array<string> = [
        'Создание библиотеки',
        'Сильный бэкенд',
        'Регистрация и авторизация',
        'Внешние решения',
        'Оценивайте и комментируйте',
        'Редактируйте и удаляйте',
        'Главная страница', 
        'Читате и делитесь',
      ];

      const featuresDescriptions: Array<string> = [
        'Удобный интерфейс сайта поможет вам добавить на виртуальные полки как прочитанные книги, так и те, которые еще ждут своего часа.',
        'В нашем созданном полностью с нуля бэкенду реализован обширный арсенал HTTP-запросов (REST API), роутинги, работа с изображениями, подключена база данных (MongoDB) и многое другое.', 
        'Чтобы воспользоваться всеми возможностями нашего приложения, пройдите регистрацию в наших удобных pop-up окнах. Меняйте свои аватар и имя пользователя, и не бойтесь забыть пароль: вы всегда можете его восстановить!', 
        'В нашем приложении использованы популярные внешние библиотеки - Swiper.JS, Choices.JS и Anime.JS - с помощью которых реализованы визуальные элементы для наиболее приятного пользовательского опыта.',
        'Представьте себя строгим литературным критиком — поставьте прочитанной книге оценку и напишите хвалебную или, наоборот, разгромную рецензию. Сравните ваше мнение о книге и мнения других читателей, ознакомившись с другими рецензиями.',
        'Если вы нашли более точную формулировку или ваше мнение поменялось, вы всегда можете изменить свою рецензию в личном кабинете. Или, если вы передумали делиться своим мнением, просто удалите свою рецензию.',
        'На главной странице сайта вы найдёте наиболее популярные книги, последние пользовательские рецензии и многое другое. Все ваши просмотренные книги так же будут сохранены, и вы всегда сможете к ним вернуться.', 
        'Находите ваши любимые книги на нашем сайте, а если вы чувствуете азарт, воспользуйтесь поиском случайной книги. После прочтения обязательно поделитесь ссылкой на сайт с друзьями, ведь вместе читать веселее!', 
      ];

      for (let i = 0; i < featuresTitles.length; i++) {
        const featureWrapper = document.createElement('div');
        featureWrapper.classList.add('about__feature__wrapper');

        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('about__icon__wrapper');
        const icon = document.createElement('img');
        icon.classList.add('about__icon');
        icon.src = './images/award.png';
        iconWrapper.append(icon);

        const featureTitle = document.createElement('div');
        featureTitle.classList.add('about__feature__title');
        featureTitle.textContent = featuresTitles[i];

        const featureDesc = document.createElement('div');
        featureDesc.classList.add('about__feature__desc');
        featureDesc.textContent = featuresDescriptions[i];

        featureWrapper.append(iconWrapper, featureTitle, featureDesc);
        
        featuresWrapper.append(featureWrapper);
      }

      return featuresWrapper;

    }

    createWannaJoinArea() {
      const wannaJoinWrapper = document.createElement('div');
      wannaJoinWrapper.classList.add('wrapper', 'about__wannajoin__wrapper');

      const wannaText = document.createElement('div');
      wannaText.classList.add('about__wannajoin__text');
      wannaText.textContent = 'Хотите присоединиться к нам? Нет ничего проще и увлекательнее!';

      wannaJoinWrapper.append(wannaText);

      if (this.authStatus === false) {
        const wannaButton = document.createElement('button');
        wannaButton.classList.add('button', 'about__wannajoin__button');
        wannaButton.textContent = 'Зарегистрироваться';

        wannaButton.addEventListener('click', () => {
          this.showRegisterPopUp();
        })

        wannaJoinWrapper.append(wannaButton);
      }

      return wannaJoinWrapper;
    }

    createAboutPage() {
      const section = document.createElement('section');
      section.classList.add('wrapper');

      const developersTitle = document.createElement('div');
      developersTitle.classList.add('about__section__title');
      developersTitle.textContent = 'Разработчики';

      const featuresTitle = document.createElement('div');
      featuresTitle.classList.add('about__section__title');
      featuresTitle.textContent = 'Приложение';

      section.append(developersTitle, this.createPhotosArea(), featuresTitle, this.createFeaturesArea(), this.createWannaJoinArea());
      return section;
    }
    
    render() {
        this.container.append(this.creatHeaderArea(), this.createAboutPage());

        App.closeLoader();

        if (screen.width > 1000) {
          setTimeout(this.animatePhotos.bind(this), 2000);
        }
        
        window.addEventListener('blur', () => {
          document.title = 'Explore the other worlds with us';
        })

        window.addEventListener('focus', () => {
          document.title = 'RS Book';
        })

        return this.container;
    }
}
