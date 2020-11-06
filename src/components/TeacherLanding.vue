<template lang="pug">
  .content-wrapper
    .content
      .infoBox
        #online
          .Main
            #design6.gradient
            p.md-display-4
              #FeatureTitle Создавайте любые онлайн-уроки<br> в конструкторе MathPlace
            p#DistirbText
              | Делитесь знаниями на нашей образовательной платформе
            #design5.gradient
          .tryButton
            router-link.button.button--round.designButtonLesson(to='/customTitle') Попробовать

        img.photo(src="./images/second_step.png")

      .Main3
        p#FeatureTitle Что такое MathPlace? 🤔
        p#FeatureText Многофункциональная и гибкая платформа для изучения и размещения образовательных уроков по математике.  <strong>Просто, быстро, удобно</strong></p>
        //- <div id="design5" class="gradient"></div>
        div.AllAdvantages
            div.Advantage
                .Advantages
                    img(src="https://static.tildacdn.com/tild3339-3666-4063-a631-653166336266/A16.svg")
                    strong Большая аудитория
                    p Больше 2000 пользователей используют MathPlace для обучения
            div.Advantage
                .Advantages
                    img(src="https://static.tildacdn.com/tild3339-3666-4063-a631-653166336266/A16.svg")
                    strong Мобильное приложение
                    p Ученики уроков могут учиться в удобном приложение MathPlace для Android
            div.Advantage
                .Advantages
                    img(src="https://static.tildacdn.com/tild3339-3666-4063-a631-653166336266/A16.svg")
                    strong Удобный конструктор
                    p Разработали удобный конструктор для организации дистанционного образования

      .Instruction.verticalBlock
        .leftMain
          p.boldText(style="text-align: left;") Создайте свой<br> урок за 10 минут
          p#DistirbText2(style="text-align: left;") Сфокусируйтесь на контенте, остальное за нами
          router-link.button.designButtonLesson.goButton(style="text-align: left;" to='/customTitle') Начать
        .rightMain.verticalBlock
          .Step
            p.boldText2(style="text-align: left;") Соберите всё нужное учащимся в одном месте
            p#DistirbText3(style="text-align: left;") Создайте свой урок и соберите всю нужную для учебы информацию в одном месте: конспект урока, задания к нему, домашние задания, контрольные работы. Отслеживайте прогресс учащихся в табеле успеваемости.
            img.sizeImg(src="./images/first_step.png")
          .Step
            p.boldText2(style="text-align: left;") Настройте автоматическую проверку
            p#DistirbText3(style="text-align: left;") MathPlace умеет автоматически проверять задания учащихся: тест, числовой ответ, развернутое решение, множественный выбор или задача на доказательство.
            img.sizeImg(src="./images/second_step.png")
          .Step
            p.boldText2(style="text-align: left;") Общайтесь со своими учениками
            p#DistirbText3(style="text-align: left;") Вы можете общаться с учащимися в чате класса или переписываться в комментариях к уроку. Отслеживайте какой отклик вызывает тот или иной материал.
            img.sizeImg(src="./images/main_screen.png")
          .Step
            p.boldText2(style="text-align: left;") Анализируйте эффективность обучения
            p#DistirbText3(style="text-align: left;") Работайте с результатами и статистикой по уроку, следите за успеваемостью учеников. Используйте автоматическую проверку заданий, чтобы не тратить время. Улучшайте ваш курс на основе данной статистики, чтобы урок был более эффективным.
            img.sizeImg(src="./images/first_step.png")
      p#FeatureTitle Занимайтесь математикой <br>в удобных форматах 😎
      div.AllVerticalLines
          div.verticalBlock
              img.LeftBigImage(src="./images/second_step.png")
              div.RightVerticalText
                  strong.halfboldTextVertical Создавайте <br>открытые уроки
                  p.halfRegularTextVertical Обучайте тому, в чем отлично разбираетесь. В каталоге собраны курсы по темам от ЕГЭ до всероссийской олимпиады школьников. Добавьте бесплатный курс по своей теме для любознательной аудитории MathPlace.
          div.verticalBlock
              img.RightBigImage(src="./images/first_step.png")
              div.LeftVerticalText
                  strong.halfboldTextVertical Проводите обучение <br>для собственного класса
                  p.halfRegularTextVertical Используйте платформу, как конструктор курсов по любой теме и обучайте тех, кого пригласите. Вам будет доступна вся функциональность платформы, при этом курс останется непубличным.
          div.verticalBlock
              img.LeftBigImage(src="./images/first_step.png")
              div.RightVerticalText
                  strong.halfboldTextVertical Пользуйтесь открытой <br>базой задач MathPlace
                  p.halfRegularTextVertical Добавляйте в свои уроки уже готовые задачи и теорию из базы MathPlace. Материалы составлялись квалифицированными преподавателями из университетов, школ и олимпиадных кружков
      .functionalityBox
        .functionalityHeader.topicHeader
          p.md-display-4#FeatureTitle Функциональность платформы <br>— наше главное преимущество 🔥
        .functionalityCards
          md-card.functionalityCard(md-with-hover v-for = '(func, i) in funionalityList' :key='func.id')
            md-ripple
              md-card-content
                .md-title {{ func.title }}
              md-card-actions
                md-button(@click ='showTip(i)') Подробнее
      .reviewBox
        .reviewHeader.topicHeader
          span.md-display-4.boldText Отзывы
        .reviewCarousel
          carousel(:per-page="1" pagination-color='#bababa' pagination-active-color='#763DCA').carouselBox
            slide(v-for = 'slide in slides' :key='slide.id')
              p.md-body-2.reviewText {{ slide.text }}
              strong.md-body-1.reviewAuthor {{ slide.author }}
              //- img(:src="slide.image")
              span.md-body-2.reviewText {{ slide.job }}
    .dialogWindow
      md-dialog(:md-active.sync='showDialog')
        md-dialog-title {{ funionalityList[activeTip].title }}
        md-dialog-content
          ul(style='padding-left 20px !important')
            li(v-for="s in funionalityList[activeTip].description" style='list-style-type:disc !important') {{ s }}
        md-dialog-actions
          md-button.md-raised.md-primary.leftButton(style="position:relative; float:left;" to ='/customTitle') Создать свой урок
          md-button.md-primary(@click='showDialog = false') Закрыть
    div#AboutDevelopers
      img#finishImg(src="./images/final_screen.png")
      div#finish
          h1#finishTitle Посмотрите на <br>платформу в деле
          p#finishText Посмотрите на платформу в деле, создав свой первый курс с полной функциональностью
          .AlignCenterButton2
              router-link.button.designButtonLesson.goButton(to='/') Начать!

</template>

<script>
export default {
  data () {
    return {
      funionalityList: [
        {
          id: 1,
          title: 'Контроль за учениками',
          description: ['Ограничение доступа входа в урок по времени']
        },
        {
          id: 2,
          title: 'Статистика по уроку',
          description: ['Просмотр общей статистики по курсу (регистрации на курс, отзывы и сертификаты, просмотры уроков) Просмотр решений пользователей к заданиям из курса']
        },
        {
          id: 3,
          title: 'Автоматическая или ручная проверка',
          description: ['Автоматическая проверка тестовых или иных заданий', 'Возможность загрузки подробного решения задачи']
        },
        {
          id: 4,
          title: 'Различные виды задач',
          description: ['Задачи с одним или несколькими правильными ответами', 'Тестовые задачи с множественным выбором или выбором правильного ответа из нескольких', 'Загрузка подробного решения', 'Задания не требующие решения']
        },
        {
          id: 5,
          title: 'Возможность загрузки pdf и word файлов',
          description: ['Pdf и Word файлы автоматически расшифруются, их не надо будет загружать']
        },
        {
          id: 6,
          title: 'Режим контрольной работы',
          description: ['Ограничения по времени прохождения экзамена', 'Ограничения по числу попыток', 'Возможность сделать разные варианты контрольной']
        },
        {
          id: 7,
          title: 'Тех. поддержка',
          description: ['Письменная поддержка преподавателей']
        },
        {
          id: 8,
          title: 'Редактор уроков',
          description: ['Работа с курсом с любого устройства в онлайн-режиме', 'Возможность редактировать текст прямо в уроке', 'Загрузка видео в урок', 'Редактирование материала уроков']
        },
        {
          id: 9,
          title: 'Управление доступом в уроках',
          description: ['Возможность создания урока в приватном режиме', 'Добавление, удаление учеников вручную и по приглашению в урок', 'Загрузка видео в урок', 'Редактирование материала уроков']
        },
        {
          id: 10,
          title: 'Загрузка файлов',
          description: ['Добавление файлов в уроки', 'Использование файлов в решениях задач со свободным ответом и текстовой задаче']
        }
      ],
      showDialog: false,
      activeTip: 0,
      slides: [
        {
          id: 1,
          text: 'Платформа крутая! Раньше у меня была тройка по математике, а с этим приложением я сдал ОГЭ на 5– и занял второе место на региональном этапе олимпиады по математике! Удачи авторам! Большое спасибо за подготовку!',
          job: 'Ученик 11 класса',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Михаил Сухоруков'
        },
        {
          id: 2,
          text: 'С тех пор, как наша учительница математики начала давать нам уроки в MathPlace, я четко увидел заинтересованность и энтузиазм в глазах своих одноклассников, да и в своих тоже. Мне очень нравится эта платформа в плане ее доступности - домашнюю работу я теперь могу делать даже в дороге, благодаря версии на телефон и черновику в ней. Лично советую каждому ученику, который хочет изменить уровень своих занятий.',
          job: 'Ученик 10 класса',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Иван Долгих'
        },
        {
          id: 3,
          text: 'Я понял, что мне нравится заниматься математикой еще в 6 классе. Теперь я не вылезаю отсюда. Очень нравятся функции черонвика и возможность посмотреть решение, когда непонятно, как решать задачу.',
          job: 'Победитель регионального этапа по математике',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Гордей Завьялов'
        }
      ]
    }
  },
  methods: {
    showTip (i) {
      this.activeTip = i
      this.showDialog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
.leftButton
  position relative
  float left
  text-align left
  margin-left 0px
  left 0px
.verticalBlock
    height auto
    display: block;
    margin-top 150px
    @media screen and (max-width: 500px) {
      margin-top 50px
    }
.verticalBlock:after
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    margin: 0;
    padding: 0;
.Instruction
  position relative
  height auto
  width 100%
.Step
  position relative
  width 100%
  height auto
  display block
  margin-bottom 200px

.leftMain
  position: sticky;
  width auto
  height auto
  top: 200px;
  bottom 100px
  margin-bottom 100px
  margin-top 150px
  line-height 1
  display inline-block
  margin-left 15%
  @media screen and (max-width: 1000px) {
    position relative
    display block
  }
  @media screen and (max-width: 500px) {
    margin-top 0px
  }
.rightMain
  position: relative;
  margin-top: 70px;
  line-height 1
  width 42%
  float right
  display inline-block
  margin-right 20px
  @media screen and (max-width: 1000px) {
    position relative
    width 80%
    margin-top: 200px;
    margin-left 10%
    margin-right 0px
  }
  @media screen and (max-width: 500px) {
    width 90%
    margin-top: 200px;
    margin-left 0%
  }
.boldText
  width auto
  height auto
  margin-top 10%
  margin-bottom 0px
  text-align center
  line-height 1.3
  font-family  'Roboto'
  font-size 40px
  font-weight 500
  @media screen and (max-width: 400px) {
    font-size 30px
  }
.boldText2
  width 50%
  height auto
  margin-top 10%
  margin-bottom 0px
  text-align center
  line-height 1.3
  font-family  'Roboto'
  font-size 28px
  font-weight 500
  @media screen and (max-width: 1000px) {
    width 70%
  }

.sizeImg
  position relative
  height 200px
  width auto
#DistirbText
    position relative
    height auto
    width 50%
    min-width 450px
    text-align center
    margin 10% auto
    margin-top 50px
    margin-bottom 90px
    color #525252
    line-height 1.2
    font-weight 300
    font-family 'Gilroy',Arial,sans-serif
    font-size  2em
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }
#DistirbText2
    position relative
    height auto
    width 70%
    text-align center
    margin-top 50px
    margin-bottom 50px
    color #525252
    line-height 1.3
    font-weight 300
    font-family 'Gilroy',Arial,sans-serif
    font-size  2em
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }
#DistirbText3
    position relative
    height auto
    width 70%
    text-align center
    margin-top 50px
    margin-bottom 50px
    color #525252
    line-height 1.3
    font-weight 400
    font-family 'Gilroy',Arial,sans-serif
    font-size  20px
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }
#FeatureText
    position relative
    height auto
    width 50%
    min-width 450px
    text-align center
    margin 10% auto
    margin-top 50px
    margin-bottom 90px
    color #525252
    line-height 1.2
    font-weight 300
    font-family 'Roboto'
    font-size  2em
    @media screen and (max-width: 450px) {
        width 100%
        min-width 100px
    }
.Main
  height auto
  width 100%
  margin-top 100px

.AllAdvantages
  position relative
  margin-left 20%
  margin-right 10%
  margin-bottom 100px
  @media screen and (max-width: 1500px) {
      width 100%
      margin-left 0%
      margin-right 0%
  }
.Advantage
  position relative
  width 30%
  margin-bottom 30px
  margin-left 30px
  display inline-block
  @media screen and (max-width: 700px) {
      width 90%
      margin-left 10%
  }
.Advantages
  position relative
  width 80%
  margin-bottom 30px
  display inline-block
  img
    height 80px
    width auto
    margin-bottom 30px
  strong
    width 100%
    display block
    font-family 'Roboto',Arial,sans-serif
    font-weight 600
    font-size 22px
  p
    margin-top 20px
    font-family 'Roboto',Arial,sans-serif
    font-size 18px

.tryButton
  position relative
  height auto
  width auto
  margin-bottom 10%
  display flex
  justify-content center

.designButtonLesson
  position relative
  height auto
  width auto
  border: 2px solid #763DCA;
  border-radius 50px
  font-weight 550
  font-size 25pt
  color #763DCA !important
  background-color #FFFFFF
  opacity 0.5
  transition: 0.6s;
  padding 22px
  margin-bottom 0px
  text-align center
  &:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
    text-decoration none

#Content
  position absolute
  width 100%
  height auto

.content-wrapper
  // clear both
  position relative
  display block
  width 100%
  background-image: radial-gradient(circle at 69% 86%, rgba(165, 165, 165,0.06) 0%, rgba(165, 165, 165,0.06) 25%,rgba(193, 193, 193,0.06) 25%, rgba(193, 193, 193,0.06) 50%,rgba(221, 221, 221,0.06) 50%, rgba(221, 221, 221,0.06) 75%,rgba(249, 249, 249,0.06) 75%, rgba(249, 249, 249,0.06) 100%),radial-gradient(circle at 49% 76%, rgba(129, 129, 129,0.06) 0%, rgba(129, 129, 129,0.06) 25%,rgba(164, 164, 164,0.06) 25%, rgba(164, 164, 164,0.06) 50%,rgba(200, 200, 200,0.06) 50%, rgba(200, 200, 200,0.06) 75%,rgba(235, 235, 235,0.06) 75%, rgba(235, 235, 235,0.06) 100%),radial-gradient(circle at 22% 64%, rgba(173, 173, 173,0.06) 0%, rgba(173, 173, 173,0.06) 25%,rgba(119, 119, 119,0.06) 25%, rgba(119, 119, 119,0.06) 50%,rgba(64, 64, 64,0.06) 50%, rgba(64, 64, 64,0.06) 75%,rgba(10, 10, 10,0.06) 75%, rgba(10, 10, 10,0.06) 100%),linear-gradient(307deg, rgb(255,255,255),rgb(255,255,255));

.Main2
  width 33%
  min-width 330px
  justify-content center
  text-align center
  margin-bottom 3%
  margin-left 1%
  margin-right 1%
  font-size 20pt
  color #000000
  font-weight 400
  font-family  'Roboto', sans-serif

.photo
  width 80%
  justify-content center
  display inline
  margin-right 10%
  margin-left 10%
  margin-bottom 50px
  margin-top 50px

@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
#Feature
  position relative
  height auto
  width 100%

#Properties
  margin 10% auto
  width 90%
  display flex
  justify-content center
  align-items center
  flex-direction row
  @media screen and (max-width: 1000px)
    flex-direction column

#FeatureTitle
  position relative
  height auto
  width auto
  min-width 450px
  text-align center
  margin auto
  color #000000
  font-weight 500
  line-height 1.2
  font-family "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
  font-size 25pt
  @media screen and (max-width: 450px) {
    width 90%
    margin-left 5%
    margin-top 10px
    min-width 100px
  }

#FeatureTitle2
  position relative
  height auto
  min-height 30px
  z-index 2
  width auto
  margin 1% auto
  min-width 40px
  text-align center
  color #000000
  font-weight 500
  font-family  'Roboto', sans-serif
  font-size 30pt
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

#FeatureText2
  position relative
  height auto
  min-height 40px
  z-index 2
  min-width 40px
  text-align center
  color #000000
  font-weight 400
  font-family  'Roboto', sans-serif
  font-size  25pt
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

.design
  display inline-block
  margin-right 40%
  margin-left 40%
  width auto
  padding 15px
  text-decoration none
  cursor pointer
  background #763dca
  border-radius 10px
  border 1px solid #765dca
  font 12px/1 Roboto, sans-serif
  color #ffffff
  font-size 30pt
  margin-bottom 3%
  text-align center
  font-color #ffffff
  text-color #ffffff

.reviewCarousel
  margin-bottom 10%
  .carouselBox
    margin auto

.carouselBox
  width 800px
  max-width 100%
  text-align center
  p
    font-size 22px
    font-family "Girloy"
    font-weight 500
    height auto
    line-height 1.5
    text-align center
    padding 50px
    padding-top 0

  strong
    min-height 90%
    font-size 18pt
    font-family "Roboto"
    font-weight 500
    margin-top 30px
    height auto
    text-align center
    padding 20px
    padding-top 20px
  span
    font-size 16px
    font-family "Girloy"
    font-weight 500
    height auto
    display block
    line-height 1.5
    text-align center
    margin-top 20px

.topicHeader
  margin 3%
  display flex
  align-items center
  justify-content center
  span
    color #000000
    text-align center
    font-size 40pt
    font-weight normal

.functionalityCards
  padding 5%
  padding-left max(calc(15% - 100px), 20px)
  padding-right max(calc(15% - 100px), 20px)
  display grid
  grid-template-columns repeat(4, 25%)
  @media screen and (max-width: 800px)
    grid-template-columns repeat(2, 50%)
.functionalityCard
  padding 3px
  min-height 20vh
  margin 1vw
  border solid #763DCA 1px
  border-radius 25px
  border-bottom-left-radius 3px
  float left
  .md-card-content
    display flex
    height 65%
  .md-card-actions
    .md-button
      margin 10px

.LeftBigImage
    height auto
    width 50%
    display inline-block
    @media screen and (max-width: 1400px) {
        margin-top 60px
        width 40%
    }
    @media screen and (max-width: 850px) {
        margin-top 60px
        width 80%
        margin-left 10%
    }
.RightBigImage
    height auto
    width 50%
    align right
    float right
    text-align right
    @media screen and (max-width: 1400px) {
        width 40%
    }
    @media screen and (max-width: 850px) {
        margin-top 60px
        width 80%
        margin-left 10%
        float left
    }

.RightVerticalText
    height auto
    width 100%
    float right
    display inline-block
    margin-top 50px
    max-width 450px
    margin-bottom 0px
    @media screen and (max-width: 850px) {
        max-width 4500px
        width 80%
        margin-left 10%
    }
    @media screen and (max-width: 450px) {
        width 95%
        margin-left 0px
    }
.LeftVerticalText
    height auto
    width auto
    display inline-block
    margin-top 50px
    max-width 400px
    margin-bottom 0px
    @media screen and (max-width: 850px) {
        max-width 4500px
        width 80%
        margin-left 10%
    }

.AllVerticalLines

    width 70%
    margin-top 100px
    margin-left 15%
    @media screen and (max-width: 1200px) {
        margin-left 5%
        width 90%
    }

.halfboldTextVertical
    position relative
    width auto
    height auto
    line-height 1.2
    text-align left
    font-family 'Roboto'
    font-size 27pt
    font-weight 400

.halfRegularTextVertical
    position relative
    width 500px
    max-width 80%
    height auto
    text-align left
    line-height 1.5
    font-family 'Roboto'
    font-size 15pt
    margin-top 40px
    font-weight 300
    @media screen and (max-width: 450px) {
      max-width 100%
    }

.halfboldText
    width 100%
    height auto
    margin-top 10%
    margin-bottom 0px
    text-align center
    line-height 1.4
    font-family 'Gilroy',Arial,sans-serif
    font-size 44px
    font-weight 530

#finish
    position relative
    width 30%
    height auto
    display inline-block
    margin-top 300px
    float right
    margin-bottom 300px
    margin-left 50px
    @media screen and (max-width: 1500px) {
        margin-top 170px
    }
    @media screen and (max-width: 1110px) {
        width 30%
        margin-top 200px
        margin-left 10%
        margin-right 10%
        margin-bottom 100px
    }
    @media screen and (max-width: 1010px) {
        width 80%
        margin-top 0px
        margin-left 10%
        margin-right 10%
        margin-bottom 100px
    }
    @media screen and (max-width: 500px) {
        margin-top 100px
    }

#finishTitle
    height auto
    width auto
    color #763DCA
    line-height 1.2
    font-weight 500
    font-family 'Roboto', sans-serif
    font-size 28pt
    @media screen and (max-width: 1010px) {
        width 100%
        text-align center
    }

#finishText
    height auto
    width 70%
    margin-top 15px
    color #919191
    line-height 1.5
    font-weight 400
    margin-bottom 30px
    font-family 'Roboto', sans-serif
    font-size 17pt
    @media screen and (max-width: 1020px) {
        width 100%
        text-align center
    }
    @media screen and (max-width: 480px) {
        width 100%
        margin-left 0%
        margin-right 0%
        text-align center
    }
#AboutDevelopers
    position relative
    height auto
    width 100%
    margin-bottom 100px
#finishImg
    position relative
    width auto
    width 40%
    margin-left 10%
    margin-top 120px
    display inline-block
    @media screen and (max-width: 1010px) {
        display none
    }
.AlignCenterButton2
    position relative
    margin-top 30px
    margin-left 0px
    @media screen and (max-width: 1030px) {
        position relative
        margin-top 30px
        text-align center
    }

.functionalityBox
  position relative
  margin-top 100px

.reviewBox
  position relative
  margin-top 100px
</style>
