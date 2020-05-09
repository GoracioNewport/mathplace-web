<template lang="html">
<div class='content-wrapper'>
    <div id="Contest">
        <a href="#MenuBlock"> <div id="BackToMenuButton"> </div> </a>
        <div id="Main">
            <div id="designBottom1" class="gradient"></div>
            <div id="leftMain">

                <div id="leftText">
                    <p class="textMargin" style="color:#000000; letter-spacing: 3px; font-family: 'Roboto', sans-serif; font-size: 1.1em; font-weight: bold;">приложение</p>
                    <p class="textMargin" style="color:#525252; font-family: 'Roboto', sans-serif; font-size: 3.8em; font-weight: bold;">MathPlace</p>
                    <h3 class="textMargin" id="leftTextDiscrib">место, где вы можете с легкостью поднять свой уровень в математике</h3>
                    <div id="DownloadButton" class="gradient2">
                        <a href="#Download" v-smooth-scroll>
                            <div id="DownloadButtonText">
                                <p>Скачать</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <img id="imgMain" src="./images/woman_arm2.png" alt="Второй текст"/>
                </div>
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
                <img class="MenuButton" src="./images/logic.png"/>
                <p class="TextMenu">Логика</p>
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
                <p id="FeatureText"><strong>MathPlace</strong> это приложение, где вы можете изучать математику, не убирая телефон из рук. Удобное и бесплатное. Благодаря понятной теории и интересным задачам для усвоения каждой теории, приложение подходит для тех кто хочет повысить свой скилл. Даже самые продвинутые найдут задачи себе по вкусу. <strong>Просто и Легко</strong></p>
                <div id="design5" class="gradient"></div>
            </div>
        </div>
        <div id="Topics" class="gradient">
            <div class="TopicBox">
                <img class="ImageBox" src="./images/first_block.png"/>
                <h1 class="TitleBox">Интересные задачи</h1>
                <p class="TextBox">Более 500 задач и 50 уроков, а также несколько вариантов ОГЭ</p>
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
                <p id="TextTask2">В три коробки поровну разложили 90 чашек. В результате в каждой коробке оказалось 30 чашек. Записать выражение, которое описывает, что 90 чашек разложено в 3 коробки. Далее выполнить действие в этом выражении.</p>
            </div>
            <div id="rightTask">
                <input type="text" id="TaskIn">
                <a href="#Task-Button">
                    <div id="TaskButton" v-on:click="sendAnswer()" class="gradient">
                        <p id="TaskButtonText">Отправить</p>
                    </div>
                </a>
            </div>
            <div id="design3" class="gradient"></div>
        </div>
        <div id="Download" class="gradient">
            <div id="GooglePlayBox">
                <a class="abutton" href="https://play.google.com/store/apps/details?id=com.math4.user.mathplace&hl=ru">
                    <div id="GooglePlay_DownloadButton">
                        <p class="DownloadText">Скачать</p>
                    </div>
                </a>
            </div>
            <div id="DownloadAPKBox">
                <a class="abutton" href="/">
                    <div id="DownloadAPK_DownloadButton">
                        <p style="color: #ffffff" class="DownloadText">Начать</p>
                    </div>
                </a>
            </div>
        </div>
        <div id="AboutDevelopers">
            <div id="design6" class="gradient"></div>
            <img id="finishImg" src="./images/two_phone.png" />
            <div id="finish">
                <h1 id="finishTitle">Начинай</h1>
                <p id="finishText">Не бойтесь начать уже сегодня. В приложение есть теория и задачи для всех от начинающих до профи.</p>
            </div>
            <div id="design8" class="gradient"></div>
        </div>
        <div id="AboutUs" class="gradient">
            <p id="headerAboutUs">Наши соцсети</p>
            <div id="Media">
                <a href="vk.com">
                    <div id="vkontakte">
                    </div>
                </a>
                <a href="telegam.com">
                    <div id="telegram">
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

</template>

<script>
// import Vue from 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'
// import Test from '@/components/test.js'
// export default {
//   components: {
//     Test
//   }
// }

</script>

<style lang="stylus" scoped>

<style lang="stylus" scoped>

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
    width 16%
    min-width 250px
    height 100%
    @media screen and (max-width: 450px) {
        display inline-block
        width 49.3%
        min-width 100px
        // margin 0 auto
    }

#Main
    // position absolute
    // float left
    height 90vh
    width 100%
    background-color #ffffff
    @media screen and (max-width: 450px) {
        height 500px
    }
    @media screen and (max-width: 800px) {
        height 500px
    }

.Main2
    // position absolute
    // float left
    height auto
    width 100%
    background-color #ffffff

#MenuBlock
    position relative
    // overflow hidden
    width 100%
    // float left
    // margin-top 0%
    height auto
    z-index 50

#BackToMenuButton
    z-index 10
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
    margin 10px

#leftMain
    position absolute
    height 90%
    width 80%
    left 20%
    top 10%
    @media screen and (max-width: 450px) {
        // display inline-block
        height 100%
        top 10px
        // margin 0 auto
    }
    @media screen and (max-width: 800px) {
        height 100%
        top 15px
    }

#leftText
    position absolute
    height 100%
    width 100%
    left 0%
    top 10%

#leftTextDiscrib
    width 28%
    min-width 300px
    color #919191
    font-family 'Roboto', sans-serif
    margin-top 15px
    font-size 1.22em
    @media screen and (max-width: 480px) {
        width 80%
        min-width 100px
    }

#imgMain
    position absolute
    height 98%
    width 50%
    left 40%
    top 00%
    @media screen and (max-width: 1000px) {
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
    width 60%
    margin-left 20%
    margin-right 20%
    margin-top 20%
    background-repeat no-repeat
    background-size 60%
    border-radius 100%
    box-shadow rgba(0, 0, 0, 0.5) 7px 7px

#DownloadButton
    // position absolute
    // left 0%
    // top 25%
    margin 10px
    height auto
    width 200px
    border-radius 50px 50px
    box-shadow rgba(145, 145, 145, 1) 5px 5px

#DownloadButtonText
    height 100%
    width 100%
    text-align center
    vertical-align middle
    color:#FFFFFF
    font-size 2em
    font-family: 'Roboto', sans-serif
    font-weight: bold
    // background-image url(images/Download.png)
    // background-repeat no-repeat
    // background-size 100%

#TextBlock
    width 100%
    margin-top 0%
    text-align center
    color #ffffff
    font-family 'Roboto', sans-serif
    font-size 3.5em
    font-weight bold

@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
#Feature
    position relative
    height auto
    width 100%

#FeatureText
    position relative
    height auto
    width 50%
    min-width 450px
    margin-top 10%
    margin-bottom 10%
    text-align center
    margin 10% auto
    color #525252
    font-weight 400
    font-family  'Roboto', sans-serif
    font-size  2em
    @media screen and (max-width: 450px) {
        // display inline-block
        width 80%
        min-width 100px
        // margin 0 auto
    }

#Topics
    z-index 3
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
    min-width 420px
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
    height auto
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
    font-size 25px
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
    z-index 6
    position absolute
    display none
    left 32.5%
    width 35%
    height 70%
    border-radius 50%
    background-image url(images/sucsessful.png)
    background-size 100%

#TaskResultnotSucsessful
    z-index 6
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
    height auto
    width 100%
    // display table
    // margin 10%

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
    background-image url(images/Android.jpg)
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
    width 35%
    min-width 400px
    height 700px
    margin-left 9%
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
    z-index 100
    background linear-gradient(to left, #763DCA, #763DCA)

.gradient2
    z-index 100
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
    top 90%
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
