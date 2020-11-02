<template lang="pug">
<div class='content-wrapper'>
    <div id="Contest">
        <a href="#MenuBlock"> <div id="BackToMenuButton"> </div> </a>
        <div id="Main">
            <div id="designBottom1" class="gradient"></div>
            <div id="leftMain">

                <div id="leftText">
                    <p class="textMargin" style="color:#000000; font-family: 'Roboto', sans-serif; font-size: 1.5em; font-weight: bold;">платформа</p>
                    <p class="textMargin" style="color:#763DCA; font-family: 'Roboto', sans-serif; font-size: 4.8em; font-weight: bold;">MathPlace</p>
                    <h3 class="textMargin" style="color:#525252; font-family: 'Roboto', sans-serif; font-size: 1.4em;" id="leftTextDiscrib">место, где вы можете с легкостью поднять свой уровень в математике</h3>
                    .button.button--round.button-success.goButton(v-smooth-scroll href='#Download') Начать!
                </div>
                <img id="imgMain" src="./images/woman_arm2.png" alt="Второй текст"/>
            </div>
        </div>
        <div id="MenuBlock" class="gradient">
            <h1 id="TextBlock">MathPlace охватывает</h1>
            <div class="MenuBlockTopic">
                <img class="MenuButton" src="./images/algebra.png"/>
                <p class="TextMenu">Алгебра</p>
            </div>
            <div class="MenuBlockTopic">
                <img class="MenuButton" src="./images/geometry.png"/>
                <p class="TextMenu">Геометрия</p>
            </div>
            <div class="MenuBlockTopic">
                <img class="MenuButton" src="./images/examination.png"/>
                <p class="TextMenu">ОГЭ2020</p>
            </div>
            <div class="MenuBlockTopic">
                <img class="MenuButton" src="./images/school.png" />
                <p class="TextMenu">Школа</p>
            </div>
            <div class="MenuBlockTopic">
                <img class="MenuButton" src="./images/brain.png" />
                <p class="TextMenu">Олимпиады</p>
            </div>
        </div>
        <div id="Feature">
            <div class="Main2">
                <div id="design6" class="gradient"></div>
                p.boldText Что такое MathPlace?
                <p id="FeatureText"> Многофункциональная и гибкая платформа для изучения и размещения образовательных уроков по математике.  <strong>Просто, быстро, удобно</strong></p>
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

            </div>
        </div>
        <div id="Feature">
            p.halfboldText Занимайтесь математикой <br>в любых форматах🔥
            div.AllVerticalLines
                div.verticalBlock
                    img.LeftBigImage(src="./images/first_step.png")
                    div.RightVerticalText
                        strong.halfboldTextVertical Изучайте математику <br>в привычном формате
                        p.halfRegularTextVertical Смотрите теорию, а затем решайте несколько задач для закрепления пройденного материала
                div.verticalBlock
                    img.RightBigImage(src="./images/first_step.png")
                    div.LeftVerticalText
                        strong.halfboldTextVertical Изучайте математику <br>в привычном формате
                        p.halfRegularTextVertical Смотрите теорию, а затем решайте несколько задач для закрепления пройденного материала
                div.verticalBlock
                    img.LeftBigImage(src="./images/first_step.png")
                    div.RightVerticalText
                        strong.halfboldTextVertical Изучайте математику <br>в привычном формате
                        p.halfRegularTextVertical Смотрите теорию, а затем решайте несколько задач для закрепления пройденного материала
        </div>

        <div id="Feature">
            <div class="Main2">
                <p id="FeatureText"><strong>Станьте автором</strong> открытого урока или проводите обучение в закрытых группах. MathPlace — удобный сервис для дистанционного преподавания</p>
            </div>
            div.AllAdvantages
                div.Advantage
                    .Advantages
                        img(src="https://static.tildacdn.com/tild3339-3666-4063-a631-653166336266/A16.svg")
                        strong Классы
                        p Доступ к результатм и полной статистике своих учеников в своих курсах

                div.Advantage
                    .Advantages
                        img(src="./images/messenger.png")
                        strong Общение
                        p Общайтесь при помощи чата и создавайте группы класса
                div.Advantage
                    .Advantages
                        img(src="https://static.tildacdn.com/tild3734-6437-4536-b834-653137303264/A17.svg")
                        strong Приватные курсы
                        p Закрытые курсы, доступ к которым предоставляет только их автор
                button.goButton.alignCenter Стать автором
        </div>
        <div id="Topics" class="gradient">
            <div class="TopicBox">
                <img class="ImageBox" src="./images/first_block.png"/>
                <h1 class="TitleBox">Интересные задачи</h1>
                <p class="TextBox">Более 100 задач и 30 уроков, а также несколько вариантов ОГЭ</p>
            </div>
            <div class="TopicBox">
                <img class="ImageBox" src="./images/second_block.png"/>
                <h1 class="TitleBox">Достижения</h1>
                <p class="TextBox">Вы можете выполнять достижения и соревноваться с друзьями</p>
            </div>
            <div class="TopicBox">
                <img class="ImageBox" src="./images/third_block.png"/>
                <h1 class="TitleBox">Простота</h1>
                <p class="TextBox">Для вашего удобства темы структурированы по классам, разделам и темам. Вы обязательно найдете то что вам нужно</p>
            </div>
        </div>
        <div id="Task">
            <div id="design4" class="gradient"></div>
            <div id="TaskText">
                <p id="TextTask2">Для экзамена подготовили билеты с номерами от 1 до 50. Какова вероятность того, что наугад взятый учеником билет имеет однозначный номер?</p>
            </div>
            <div id="rightTask">
                <input type="text" id="TaskIn" v-model="answer" :class = "{ answerCorrect : this.state === 1, answerWrong : this.state === 2 }">
                <a href="#Task-Button">
                    <div id="TaskButton" @click="sendAnswer" class="gradient">
                        <p id="TaskButtonText">Отправить</p>
                    </div>
                </a>
            </div>
        </div>
        <div id="Download" >
            //- img.imgFull(src="https://static.tildacdn.com/tild3436-6361-4632-b263-323966316338/A10.svg")
            p.textPlatMarket Попробуйте наше обновленное <br>мобильное приложение
            img.imgPlayMarket(src="https://static.tildacdn.com/tild3533-6437-4834-b338-643133363864/googleplaybadge_en.png")
        </div>
        <div id="AboutDevelopers">
            <img id="finishImg" src="./images/mockup1.jpg" />
            <div id="finish">
                <h1 id="finishTitle">Начинай</h1>
                <p id="finishText">Не бойтесь начать уже сегодня. У нас есть теория и задачи для всех от начинающих до профи.</p>
                .goButton2.button.button--round.button-success.goButton2.goButton.goButton2(v-smooth-scroll href='#Download') Начать!
            </div>
            <div id="design8" class="gradient"></div>
        </div>
        <div id="AboutUs" class="gradient">
            <p id="headerAboutUs">Наши соцсети</p>
            <div id="Media">
                <a href="https://vk.com/mathplace">
                    <div id="vkontakte">
                    </div>
                </a>
                <a href="https://t.me/mathplacetg">
                    <div id="telegram">
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

</template>

<script data-who="💎 Made with naker.io 💎" src="https://d23jutsnau9x47.cloudfront.net/back/v1.0.9/viewer.js" data-option="{|environment|:{|gradient|:|horizontal|,|sensitivity|:0.8,|colorStart|:[50,22,103,1],|colorEnd|:[20,86,205,1]},|particle|:{|life|:5,|power|:0.01,|texture|:|https://res.cloudinary.com/naker-io/image/upload/v1566560053/circle_05.png|,|number|:20,|colorStart|:[116,129,92,0.13],|colorEnd|:[198,188,107,0.52],|sizeStart|:1.57,|sizeEnd|:3.14,|direction1|:{|x|:0,|y|:100,|z|:100},|direction2|:{|x|:0,|y|:0,|z|:0}},|waterMark|:false}" ></script>
<script>

export default {
  data () {
    return {
      state: 0,
      answer: ''
    }
  },
  methods: {
    sendAnswer () {
      if (this.answer === '10') this.state = 1
      else this.state = 2
    }
  }
}

</script>

<style lang="stylus" scoped>
.AllVerticalLines

    width 70%
    margin-top 100px
    margin-left 15%
.verticalBlock
    height auto
    margin-bottom 100px
.LeftBigImage
    position relative
    height 350px
    width auto
    display inline-block
.RightBigImage
    position relative
    height 350px
    width auto
    float right
    margin: 0 0 5px 5px
    clear both
.RightVerticalText
    position relative
    float right
    display inline-block
    margin-top 50px
    max-width 400px
    margin-bottom 0px
.LeftVerticalText
    position relative
    display inline-block
    margin-top 50px
    max-width 400px
    margin-bottom 0px
    float left
.halfboldTextVertical
    position relative
    width auto
    height auto
    text-align left
    font-family 'Roboto'
    font-size 27pt
    font-weight 400
.halfRegularTextVertical
    position relative
    width auto
    height auto
    text-align left
    font-family 'Roboto'
    font-size 15pt
    margin-top 20px
    font-weight 300
.goButton
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    color #763DCA
    background-color #EEE0FB
    opacity 0.9
    transition: 0.6s;
    text-align center
    vertical-align middle
.goButton2
    margin-top 30px
    font-size 14pt
.alignCenter
    position relative
    width auto
    left 30%
    vertical-align middle
    text-align center
    margin 50px 0px
.goButton:hover
    transition: 0.6s;
    color #FFFFFF
    background-color #763DCA
.goButton
    margin-left 20px
    font-size 24pt

div
    line-height normal !important
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif !important
.content-wrapper
    min-height 0

.answerCorrect
  background rgba(0, 255, 0, .5)
.answerWrong
  background rgba(255, 0, 0, .5)

#Content
    position absolute
    width 100%
    height auto

.content-wrapper
    // clear both
    position relative
    display block
    width 100%
    height 300px

.MenuBlockTopic
    position relative
    display inline-block
    width 19%
    min-width 250px
    height 100%
    z-index 4

    @media screen and (max-width: 450px) {
        display inline-block
        width 49.3%
        min-width 100px
        // margin 0 auto
    }

.halfboldText
    width 100%
    height auto
    margin-top 10%
    margin-bottom 0px
    text-align center
    font-family 'Gilroy',Arial,sans-serif
    font-size 44px
    font-weight 500
.boldText
    width 100%
    height auto
    margin-top 10%
    margin-bottom 0px
    text-align center
    font-family  'Roboto'
    font-size 50px
    font-weight 500
#Main
    // position absolute
    // float left
    height 1000px
    width 100%
    @media screen and (max-width: 800px) {
        height 500px
    }

.Main2
    // position absolute
    // float left
    height auto
    width 100%
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
#MenuBlock
    position relative
    // overflow hidden
    width 100%
    // float left
    // margin-top 0%
    height auto
    z-index 4

#BackToMenuButton
    z-index 4
    position fixed
    left 95%
    top 90%
    width 0%
    height 0%
    border-radius 50%
    box-shadow rgba(0, 0, 0, 0.5) 5px 5px
    background-image url(images/Down.png)
    background-size 100%

.textMargin
    position relative
    margin 30px

#leftMain
    position relative
    height 90%
    left 20%
    max-width 80%
    top 10%
    @media screen and (max-width: 600px) {
        // display inline-block
        height 100%
        left 0
        top 10px
        // margin 0 auto
    }
    @media screen and (max-width: 800px) {
        height 100%
        top 15px
    }

#leftText
    position relative
    display inline-block
    height auto
    width 20%
    left 0%
    top 0%

#leftTextDiscrib
    width 28%
    min-width 300px
    color #919191
    font-family 'Roboto', sans-serif
    margin-top 15px
    font-size 1.22em
    @media screen and (max-width: 600px)
        width auto

#imgMain
    position absolute
    width 35vw
    left 40%
    top 00%
    @media screen and (max-width: 1200px) {
        display none
    }

.TextMenu
    position relative
    width 100%
    height auto
    margin-top 20px
    color #ffffff
    font-family Verdana, Geneva, sans-serif
    font-size 2em
    text-align center
    font-weight bold

.MenuButton
    position relative
    height auto
    width 50%
    text-align center
    margin-left 25%
    margin-right 25%
    margin-top 20%
    background-repeat no-repeat
    background-size 60%
    border-radius 100%
    box-shadow rgba(0, 0, 0, 0.5) 7px 7px

#DownloadButton
    position relative
    margin 10px
    height 50px
    width 200px
    text-align center
    vertical-align middle
    border-radius 50px 50px
    box-shadow rgba(145, 145, 145, 1) 5px 5px

#DownloadButtonText
    position relative
    height 100%
    width 100%
    padding-top 2%
    text-align center
    vertical-align middle
    color #FFFFFF
    font-size 2em
    font-family 'Roboto', sans-serif
    font-weight bold

#TextBlock
    width 100%
    margin-top 0%
    text-align center
    color #ffffff
    font-family 'Roboto', sans-serif
    font-size 3.5em
    font-weight bold
    z-index 10000000

@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
#Feature
    position relative
    height auto
    width 100%

#FeatureText
    position relative
    height auto
    width 42%
    min-width 450px
    text-align center
    margin 10% auto
    margin-bottom 150px
    margin-top 50px
    color #525252
    font-weight 300
    font-family  'Roboto'
    font-size  2em
    @media screen and (max-width: 450px) {
        // display inline-block
        width 80%
        min-width 100px
        // margin 0 auto
    }
.AllAdvantages
    position relative
    margin-left 20%
    margin-right 10%
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
        width 100%
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

#Topics
    z-index 1
    position relative
    height auto
    width 100%

.TopicBox
    position relative
    min-height 80%
    overflow hidden
    display inline-block
    width 25%
    margin 20px
    height auto
    border-radius 10px
    background-color #ffffff
    box-shadow rgba(145, 145, 145, 1) 10px 10px

.ImageBox
    width 200px
    height 200px
    margin-left 10%
    display block
    margin 10% auto

.TitleBox
    position relative
    width 100%
    height auto
    text-align center
    margin-top 10%
    color #763DCA
    font-family 'Roboto', sans-serif
    font-size 25pt
    font-weight bold
.TextBox
    position relative
    width 80%
    text-align center
    height auto
    margin-top 10%
    margin-left 10%
    margin-right 10%
    color #525252
    font-family 'Roboto', sans-serif
    font-size 20pt
    display inline-block
.TopicBox
    position relative
    width 27%
    min-width 410px
    height 740px
    min-height 70%
    overflow hidden
    margin-top 10%
    margin-right 3%
    margin-left 3%
    border-radius 10px
    background-color #ffffff
    box-shadow rgba(145, 145, 145, 1) 10px 10px
    @media screen and (max-width: 800px) {
        width 68%
        min-width 400px
        margin-right 16%
        margin-left 16%
        height 700px
        text-align center
        vertical-align middle
        min-width 100px
    }
    @media screen and (max-width: 450px) {
        width 88%
        height 650px
        min-width 100px
        margin-right 6%
        margin-left 6%
        min-width 100px
    }

#Task
    position relative
    height 100%
    width 100%

#TaskButton
    position relative
    height auto
    width 300px
    float right
    border-radius 50px 50px
    box-shadow rgba(0, 0, 0, 0.75) 5px 5px

#TaskButtonText
    width auto
    height auto
    margin-left 20px
    margin-right 20px
    margin-top 10px
    margin-bottom 10px
    text-align center
    color #ffffff
    font-family 'Roboto', sans-serif
    font-size 25pt
    font-weight bold

#TaskIn
    position relative
    height 60px
    width 50%
    margin-left 50%
    padding 1%
    border-style groove
    border-radius 50px
    border-width 3px
    font-size 30pt
    text-align center
    @media screen and (max-width: 1000px) {
        width 90%
        margin-left 10%
        margin-right 10%
        // display block
    }

#TaskText
    position relative
    top 40px
    display inline-block
    left 10%
    width 50%
    height auto
    margin-bottom 100px
    min-height 600px
    border-radius 50px
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 0px 0px 15px
    @media screen and (max-width: 1100px) {
        width 90%
        left 5%
        // margin-left 10%
        // margin-right 10%
        display block
    }

#rightTask
    position relative
    display inline-block
    width 40%
    // margin-top 800px
    @media screen and (max-width: 1100px) {
        width 90%
        margin-top 0%
        // margin-left 10%
        margin-right 10%
        display block
    }

#TextTask2
    font-weight 800
    position relative
    width 70%
    padding-top 5%
    margin-top 15%
    margin-left 15%
    margin-right 15%
    height auto
    color #525252
    font-family 'Roboto', sans-serif
    text-align center
    font-size 20pt
    @media screen and (max-width: 1100px) {
        width 90%
        padding-top 20px
        margin-top 15px
        margin-left 15px
        margin-right 15px
        // margin-left 10%
        // margin-right 10%
        display block
    }

#TaskResultSucsessful
    z-index 2
    position absolute
    display none
    left 32.5%
    width 35%
    height 70%
    border-radius 50%
    background-image url(images/sucsessful.png)
    background-size 100%

#TaskResultnotSucsessful
    z-index 2
    position absolute
    display none
    left 32.5%
    width 35%
    height 70%
    border-radius 50%
    background-image url(images/notsucsessful.png)
    background-size 100%

#Download
    position relative
    height 200px
    line-height: 200px;
    width auto
    background: rgb(230,200,250);
    background: linear-gradient(90deg, rgba(230,200,250,1) 0%, rgba(232,130,225,1) 57%, rgba(159,158,231,1) 100%);
    border-radius 20px
    box-shadow rgba(0, 0, 0, 0.5) 0px 0px 15px
    margin-top 20px
    margin-bottom 20px
    margin-left 20%
    margin-right 20%
.imgFull
    position absolute
    height auto
    width auto
    float left
    background-size 100% 100%
    background-repeat no-repeat
.imgPlayMarket
    position: relative;
    height 100px
    width auto
    float right
    margin 50px 0
    margin-right 30px
.textPlatMarket
    margin: 0;
    transform: translate(-50%, -50%);
    position: absolute
    top: 50%
    left: 30%
    font-size 28px
.DownloadText
    height 100%
    width 100%
    text-align center
    vertical-align middle
    color:#FFFFFF
    margin-top 8px
    margin-bottom 8px
    font-size 2em
    font-family: 'Roboto', sans-serif
    font-weight: bold

#GooglePlayBox
    position relative
    display inline-block
    width 27%
    min-width 400px
    height 760px
    margin-top 50px
    margin-bottom 50px
    margin-left 11%
    margin-right 11%
    background-repeat no-repeat
    background-size 100%
    background-image url("images/GooglePlay.jpg")
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px
    @media screen and (max-width: 800px) {
        width 60%
        margin-right 20%
        margin-left 20%
        height 700px
        text-align center
        vertical-align middle
        min-width 100px
    }
    @media screen and (max-width: 450px) {
        // display block
        width 80%
        height 540px
        min-width 100px
        margin-left 10%
        min-width 280px
        margin-right 10%
        // margin 0 auto
    }

#GooglePlay_DownloadButton
    position absolute
    left 45%
    top 86%
    height auto
    width 50%
    border-radius 50px 50px
    box-shadow rgba(0, 0, 0, 0.5) 0px 0px 15px
    color #64D597

#DownloadAPKBox
    position relative
    // top 10%
    display inline-block
    bottom 10%
    width 27%
    margin-top 50px
    margin-bottom 50px
    min-width 400px
    height 760px
    margin-left 11%
    margin-right 11%
    background-repeat no-repeat
    background-size 100%
    background-image url(images/GooglePlay.png)
    background-color #ffffff
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.50) 10px 10px
    @media screen and (max-width: 450px) {
        display none
        // height 640px
        // width 80%
        // margin-left 10%
        // margin-right 10%
        // min-width 100px
        // margin 0 auto
    }
    @media screen and (max-width: 800px) {
        display none
        // width 68%
        // min-width 400px
        // margin-right 16%
        // margin-left 16%
        // height 700px
        // text-align center
        // vertical-align middle
        // min-width 100px
    }

#DownloadAPK_DownloadButton
    position absolute
    left 45%
    top 86%
    height auto
    width 50%
    background #763DCA
    border-radius 50px 50px
    box-shadow rgba(0, 0, 0, 0.5) 0px 0px 15px
    color #763DCA

#AboutDevelopers
    position relative
    height auto
    width 100%

#finishImg
    position relative
    width auto
    min-width 400px
    height 700px
    margin-left 19%
    margin-top 120px
    display inline-block
    @media screen and (max-width: 1010px) {
        display none
    }

#finish
    position relative
    width 30%
    min-width 380px
    height auto
    display inline-block
    margin-top 100px
    margin-left 20%
    @media screen and (max-width: 1010px) {
        width 80%
        text-align center
        min-width 0px
        margin-left 10%
        margin-right 10%
        margin-bottom 100px
    }

#finishTitle
    height auto
    width 40%
    color #763DCA
    font-weight 700
    font-family 'Roboto', sans-serif
    font-size 25pt
    @media screen and (max-width: 1010px) {
        width 100%
        text-align center
    }

#finishText
    height auto
    width 60%
    margin-top 15px
    color #919191
    font-weight:500
    font-family 'Roboto', sans-serif
    font-size 17pt
    @media screen and (max-width: 480px) {
        width 100%
        text-align center
    }
    @media screen and (max-width: 480px) {
        width 70%
        margin-left 15%
        margin-right 15%
        text-align center
    }

#AboutUs
    position relative
    height auto
    width 100%

#headerAboutUs
    position relative
    height 100%
    width 100%
    text-align center
    vertical-align middle
    color:#FFFFFF
    font-size 3.6em
    font-family: 'Roboto', sans-serif
    font-weight: bold

#Media
    position relative
    margin 0px 0px 0px 0px auto
    text-align center
    vertical-align middle
    margin-top 40px

#vkontakte
    position relative
    height 200px
    width 200px
    // margin-left 20%
    margin-bottom 50px
    display inline-block
    background-repeat no-repeat
    border-radius 50%
    background-image url(images/vk.png)
    background-size 100% 100%
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px
    @media screen and (max-width: 450px) {
        height 100px
        width 100px
    }

#telegram
    position relative
    height 200px
    width 200px
    margin-bottom 50px
    margin-left 80px
    display inline-block
    background-repeat no-repeat
    border-radius 50%
    background-image url(images/telegram.png)
    background-size 100% 100%
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px
    @media screen and (max-width: 450px) {
        height 100px
        width 100px
    }

.gradient
    z-index 3
    background linear-gradient(to left, #763DCA, #763DCA)

.gradient2
    z-index 3
    background linear-gradient(to left, #26de81, #26de81)

body
    margin 0px 0px
    overflow-x hidden

#design1
    position absolute
    left 80%
    width 20%
    height 40%
    border-radius 50%

#design2
    position absolute
    top 10%
    left 60%
    width 20%
    height 20%
    background-color #ffffff
    border-radius 50%

#design3
    position relative
    width 100%
    height 100px
    border-top-right-radius 100%
    border-top-left-radius 90%
    @media screen and (max-width: 1100px) {
        margin-top 100px
    }

#designBottom1
    position relative
    width 100%
    height 10%
    z-index 4
    top 90%
    z-index 4
    border-top-right-radius 100%
    border-top-left-radius 90%

#design4
    position relative
    width 100%
    height 100px
    border-bottom-right-radius 100%

#design5
    position relative
    width 100%
    height 100px
    border-top-left-radius 100%

#design6
    position relative
    width 100%
    height 100px
    border-bottom-left-radius 100%
    border-bottom-right-radius 100%

#design7
    position absolute
    // top 90%
    width 100%
    height 10%
    border-top-left-radius 100%

#design8
    position absolute
    width 100%
    height 10%
    top 90%
    border-top-right-radius 100%
    border-top-left-radius 90%

</style>
