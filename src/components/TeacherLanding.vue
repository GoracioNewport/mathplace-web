<template lang="pug">
  .content-wrapper
    .content
      .infoBox
        #online
          .Main
            #design6.gradient
            p.md-display-4#FeatureTitle Создавайте любые онлайн-уроки<br> в конструкторе MathPlace
            p#DistirbText
              | Делитесь знаниями на нашей образовательной платформе
            #design5.gradient
          .tryButton
            router-link.button.button--round.designButtonLesson(to='/customTitle') Попробовать

        img.photo(src="./images/second_step.png")

      .Main3
        p.boldText Что такое MathPlace? 🤔
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
          router-link.button.button--round.designButtonLesson(style="text-align: left;" to='/') Начать бесплатно
        .rightMain.verticalBlock
          .Step
            p.boldText2(style="text-align: left;") Соберите всё нужное учащимся в одном месте
            p#DistirbText3(style="text-align: left;") Создайте свой курс и соберите всю нужную для учебы информацию в одном месте: запись или трансляцию урока, задания к нему, домашние задания, ссылки на дополнительные источники. Отслеживайте прогресс учащихся в табеле успеваемости.
            img.sizeImg(src="./images/first_step.png")
          .Step
            p.boldText2(style="text-align: left;") Настройте автоматическую проверку
            p#DistirbText3(style="text-align: left;") MathPlace умеет автоматически проверять задания учащихся: тест, числовой ответ, задача на программирование, сопоставление – всего больше 20 видов заданий.
            img.sizeImg(src="./images/second_step.png")
          .Step
            p.boldText2(style="text-align: left;") Общайтесь со своими студентами
            p#DistirbText3(style="text-align: left;") Вы можете общаться с учащимися в курсе непосредственно под заданиями и видео-уроками, а значит, отслеживать какой отклик вызывает тот или иной материал. А если вам нужно сообщить что-то всем учащимся одновременно — просто сделайте рассылку новостей.
            img.sizeImg(src="./images/main_screen.png")
          .Step
            p.boldText2(style="text-align: left;") Анализируйте эффективность обучения
            p#DistirbText3(style="text-align: left;") Работайте с отчетами и статистикой по курсу, следите за успеваемостью студентов. Используйте автоматическую аналитику качества курса. Улучшайте ваш курс на основе данных отчетов, чтобы привлечь еще больше учащихся.
            img.sizeImg(src="./images/first_step.png")
      p.halfboldText Занимайтесь математикой <br>в удобных форматах 😎
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
          span.md-display-4.boldText Функциональность платформы <br>— наше главное преимущество 🔥
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
              img(:src="slide.image")
              span.md-body-2.reviewText {{ slide.job }}
    .dialogWindow
      md-dialog(:md-active.sync='showDialog')
        md-dialog-title {{ funionalityList[activeTip].title }}
          span {{ funionalityList[activeTip].description }}
        md-dialog-actions
          md-button.md-raised.md-primary(to ='/customTitle') Создать свой урок
          md-button.md-primary(@click='showDialog = false') Закрыть
    div#AboutDevelopers
      img#finishImg(src="./images/final_screen.png")
      div#finish
          h1#finishTitle Посмотрите на <br>платформу в деле
          p#finishText Посмотрите на платформу в деле, создав свой первый курс с полной функциональностью
          .AlignCenterButton2
              router-link.button.button--round.designButtonLesson(to='/customTitle') Начать!

</template>

<script>
export default {
  data () {
    return {
      funionalityList: [
        {
          id: 1,
          title: 'Контроль за учениками',
          description: 'Test'
        },
        {
          id: 2,
          title: 'Статистика по уроку',
          description: 'Просмотр общей статистики по курсу (регистрации на курс, отзывы и сертификаты, просмотры уроков) Просмотр решений пользователей к заданиям из курса'
        },
        {
          id: 3,
          title: 'Автоматическая или ручная проверка',
          description: 'Test'
        },
        {
          id: 4,
          title: 'Различные виды задач',
          description: 'Test'
        },
        {
          id: 5,
          title: 'Возможность загрузки pdf и word файлов',
          description: ['Pdf и Word файлы автоматически расшифруются, их не надо будет загружать']
        },
        {
          id: 6,
          title: 'Режим контрольной',
          description: ['Ограничения по времени прохождения экзамена','Ограничения по числу попыток', 'Возможность сделать разные варианты контрольной'
        },
        {
          id: 7,
          title: 'Тех. поддержка',
          description: ['Письменная поддержка преподавателей']
        },
        {
          id: 8,
          title: 'Редактор уроков',
          description: ['Работа с курсом с любого устройства в онлайн-режиме','Возможность редактировать текст прямо в уроке','Загрузка видео в урок','Редактирование материала уроков']
        }
      ],
      showDialog: false,
      activeTip: 0,
      slides: [
        {
          id: 1,
          text: 'Stepik предлагает все необходимые инструменты для создания современных онлайн-курсов, в особенности по программированию. И еще – это замечательная профессиональная команда, при поддержке которой эксперты Samsung создали одни из самых популярных открытых курсов по применению нейронных сетей в задачах компьютерного зрения и обработки текстов. Эти курсы теперь изучают десятки тысяч пользователей и студенты образовательного проекта «IT Академия Samsung» в вузах России и Казахстана.',
          job: 'Руководитель образовательных программ, Исследовательский центр Samsung',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Еблан Ебланович'
        },
        {
          id: 2,
          text: 'Пандемия коронавируса ускорила внедрение децентрализованного образования в университетах: образование частично переносится в сферу online. В этой связи факультет Международных экономических отношений обратил внимание на платформу Stepik. Мы ценим быструю техническую поддержку сотрудников, которые откликаются на наши потребности в создании языковых курсов и курсов по специальным дисциплинам. Особенно для нас интересна возможность создания закрытых курсов, когда преподаватель самостоятельно определяет аудиторию, используя онлайн-модули в качестве дополнения к очным занятиям.',
          job: 'Команда факультета Международных экономических отношений МГИМО МИД России',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Винебот Салера'
        },
        {
          id: 3,
          text: 'Для многих наших слушателей онлайн-обучение является единственно доступным способом повысить свою квалификацию, при этом иногда жизненно необходимым для их организаций. Важно, чтобы сам процесс обучения был максимально прост и понятен для них. Очень большое значение в этом имеет удобство платформы – как с точки зрения визуального оформления, так и с точки зрения технических решений. Мы очень рады, что нашли такую платформу в лице Stepik.',
          job: 'Председатель Правления Центра РНО',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Гордей Завьялов'
        },
        {
          id: 4,
          text: 'Платформа Stepik — отличное место для курсов по IT-тематике. И аудитория, и сама платформа учитывает специфику таких курсов. Онлайн-курсы от преподавателей факультета компьютерных наук НИУ ВШЭ помогают представлять факультет будущим абитуриентами, а также рассказывать о нём на широкую аудиторию. И в целом, очень ценно, что команде Stepik удается привлекать в качестве слушателей нашу целевую аудиторию, заинтересованную в компьютерных науках.',
          job: 'Руководитель проекта Data Culture, координатор онлайн-курсов ФКН НИУ ВШЭ',
          image: 'https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png',
          author: 'Джейсон Стетхем'
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
.verticalBlock
    height auto
    display: block;
    margin-top 150px
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
  display block
  margin-bottom 200px
.leftMain
  position: sticky;
  width auto
  top: 200px;
  bottom 100px
  margin-bottom 100px
  margin-top 150px
  line-height 1
  display inline-block
  margin-left 15%
.rightMain
  position: sticky;
  margin-top: 70px;
  line-height 1
  width 42%
  float right
  display inline-block
  margin-right 20px
.boldText
  width 100%
  height auto
  margin-top 10%
  margin-bottom 0px
  text-align center
  line-height 1.3
  font-family  'Roboto'
  font-size 50px
  font-weight 500
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
        width 80%
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
  background-image: repeating-linear-gradient(135deg, rgba(86, 86, 86, 0.02) 0px, rgba(86, 86, 86, 0.02) 22px,rgba(202, 202, 202, 0.02) 22px, rgba(202, 202, 202, 0.02) 67px,rgba(247, 247, 247, 0.02) 67px, rgba(247, 247, 247, 0.02) 113px,rgba(135, 135, 135, 0.02) 113px, rgba(135, 135, 135, 0.02) 132px,rgba(157, 157, 157, 0.02) 132px, rgba(157, 157, 157, 0.02) 153px,rgba(53, 53, 53, 0.02) 153px, rgba(53, 53, 53, 0.02) 171px,rgba(17, 17, 17, 0.02) 171px, rgba(17, 17, 17, 0.02) 181px,rgba(179, 179, 179, 0.02) 181px, rgba(179, 179, 179, 0.02) 220px),repeating-linear-gradient(135deg, rgba(58, 58, 58, 0.02) 0px, rgba(58, 58, 58, 0.02) 41px,rgba(198, 198, 198, 0.02) 41px, rgba(198, 198, 198, 0.02) 60px,rgba(176, 176, 176, 0.02) 60px, rgba(176, 176, 176, 0.02) 99px,rgba(173, 173, 173, 0.02) 99px, rgba(173, 173, 173, 0.02) 146px,rgba(239,161,231, 0.05) 146px, rgba(239,161,231, 0.05) 167px,rgba(179, 179, 179, 0.02) 167px, rgba(179, 179, 179, 0.02) 205px,rgba(228, 228, 228, 0.02) 205px, rgba(228, 228, 228, 0.02) 230px,rgba(23, 23, 23, 0.02) 230px, rgba(23, 23, 23, 0.02) 241px),repeating-linear-gradient(135deg, rgba(243,172,241, 0.06) 0px, rgba(243,172,241, 0.06) 15px,rgba(74, 74, 74, 0.02) 15px, rgba(74, 74, 74, 0.02) 45px,rgba(235,144,230, 0.08) 45px, rgba(235,144,230, 0.08) 71px,rgba(43, 43, 43, 0.02) 71px, rgba(43, 43, 43, 0.02) 95px,rgba(131, 131, 131, 0.02) 95px, rgba(131, 131, 131, 0.02) 118px,rgba(21, 21, 21, 0.02) 118px, rgba(21, 21, 21, 0.02) 130px,rgba(77, 77, 77, 0.02) 130px, rgba(77, 77, 77, 0.02) 167px,rgba(229,36,235, 0.04) 167px, rgba(229,36,235, 0.04) 189px),linear-gradient(90deg, rgb(251, 251, 251),rgb(250, 250, 250))

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
  margin-top 100px
  color #000000
  font-weight 500
  line-height 1.2
  font-family 'Gilroy',Arial,sans-serif
  font-size 30pt
  @media screen and (max-width: 450px) {
    width 80%
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
  // max-width max(900px, 100px)
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
    height auto
    text-align left
    line-height 1.5
    font-family 'Roboto'
    font-size 15pt
    margin-top 40px
    font-weight 300
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
</style>
