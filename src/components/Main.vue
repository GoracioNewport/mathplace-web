<template lang="html">
<div class='content-wrapper'>
    <a href="#MenuBlock"> <div id="BackToMenuButton"> </div> </a>
    <div id="Main">
        <div id="leftMain">

            <div id="leftText">
                <p class="textMargin" style="color:#000000; letter-spacing: 3px; font-family: 'Roboto', sans-serif; font-size: 20px; font-weight: bold;">приложение</p>
                <p class="textMargin" style="color:#525252; font-family: 'Roboto', sans-serif; font-size: 62px; font-weight: bold;">MathPlace</p>
                <h3 class="textMargin" style="width:378px; color:#919191; font-family: 'Roboto', sans-serif; margin-top: 15px; font-size: 22px;">место, где вы можете с легкостью поднять свой уровень в математике</h3>
                <div id="DownloadButton" class="gradient2">
                    <a href="#Download">
                        <div id="DownloadButtonText">
                            <p>Скачать</p>
                        </div>
                    </a>
                </div>
            </div>
            <div>
                <img id="imgMain" src="./images/woman_arm2.jpg" alt="Второй текст"/>
            </div>
        </div>
        <div id="designBottom1" class="gradient"></div>
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
                <img class="MenuButton" src="./images/komba.png"/>
                <p class="TextMenu">Комба</p>
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

.MenuBlockTopic
    display inline-block
    width 14%

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

#Main
    position absolute
    float left
    height 100%
    width 100%
    background-color #ffffff

.textMargin
    margin 10px

#leftMain
    position absolute
    height 90%
    width 80%
    left 20%
    top 10%

#leftText
    position absolute
    height 100%
    width 100%
    left 0%
    top 10%

#imgMain
    position absolute
    height 100%
    width 50%
    left 40%
    top 00%
    z-index 10
    @media screen and (max-width: 1000px) {
        display none
    }

#DownloadButton
    // position absolute
    // left 0%
    // top 25%
    margin 10px
    height 50px
    width 200px
    border-radius 50px 50px
    box-shadow rgba(145, 145, 145, 1) 5px 5px

#DownloadButtonText
    height 100%
    width 100%
    text-align center
    color:#FFFFFF
    font-size 2em
    font-family: 'Roboto', sans-serif
    font-weight: bold
    // background-image url(images/Download.png)
    // background-repeat no-repeat
    // background-size 100%

#MenuBlock
    float left
    height 40%
    width 100%

#TextBlock
    width 100%
    margin-top 0%
    text-align center
    color #ffffff
    font-family 'Roboto', sans-serif
    font-size 62px
    font-weight bold

.TextMenu
    position absolute
    width 170px
    height 40px
    margin-top 20px
    color #ffffff
    font-family Verdana, Geneva, sans-serif
    font-size 30pt
    text-align center
    font-weight bold

.MenuButton
    height 150px
    width 150px
    background-repeat no-repeat
    background-size 100%
    border-radius 100%
    box-shadow rgba(0, 0, 0, 0.5) 7px 7px

#AlgebraMenu
    position absolute
    left 3%
    top 35%
    height 500px
    width 170px

#GeometryMenu
    position absolute
    left 17%
    top 35%
    height 400px
    width 170px

#KombaMenu
    position absolute
    left 31%
    top 35%
    height 400px
    width 170px

#OGEMenu
    position absolute
    left 45%
    top 35%
    height 400px
    width 170px

#LogikaMenu
    position absolute
    left 59%
    top 35%
    height 400px
    width 170px

#SchoolMenu
    position absolute
    left 73%
    top 35%
    height 400px
    width 170px

#OlympMenu
    position absolute
    left 86%
    top 35%
    height 400px
    width 170px

@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
#Feature
    position absolute
    height 90%
    width 100%
    top 140%

#Topics
    z-index 3
    position absolute
    height 100%
    width 100%
    top 230%

#TextTask2
    position absolute
    width 70%
    margin-top 5%
    margin-left 15%
    margin-right 15%
    height 50%
    color #525252
    font-family 'Roboto', sans-serif
    text-align center
    font-size 25px

.ImageBox
    width 100px
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
    width 100%
    height auto
    text-align center
    margin-top 10%
    color #525252
    font-family 'Roboto', sans-serif
    font-size 20pt
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

#FirstTopic
    z-index 2
    position absolute
    left 10%
    top 25%
    width 20%
    height 60%
    border-radius 10px
    background-color #ffffff
    box-shadow rgba(145, 145, 145, 1) 10px 10px

#SecondTopic
    position absolute
    left 40%
    top 20%
    width 20%
    height 60%
    border-radius 10px
    background-color #ffffff
    box-shadow rgba(145, 145, 145, 1) 10px 10px

#ThirdTopic
    position absolute
    left 70%
    top 15%
    width 20%
    height 60%
    background-color #ffffff
    border-radius 10px
    box-shadow rgba(145, 145, 145, 1) 10px 10px

#Task
    position absolute
    height 100%
    width 100%
    top 330%

#TaskButton
    position absolute
    top 75%
    left 75%
    height 7%
    width 15%
    border-radius 50px 50px
    box-shadow rgba(0, 0, 0, 0.75) 5px 5px

#TaskButtonText
    width 90%
    height 90%
    background-image url(images/input.png)
    background-size 100%
    margin 2.5% 5%

#TaskIn
    position absolute
    top 65%
    left 70%
    height 7%
    width 20%
    padding 1%
    border-style groove
    border-radius 50px
    font-size 30pt
    text-align center

#TaskText
    position absolute
    top 15%
    left 10%
    width 50%
    height 70%
    border-radius 50px
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 0px 0px 15px

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
    position absolute
    top 430%
    height 100%
    width 100%

#GooglePlayBox
    position absolute
    left 20%
    top 10%
    bottom 10%
    width 20%
    height 80%
    background-repeat no-repeat
    background-size 100%
    // background-image url("images/GooglePlay.jpg")
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px

#GooglePlay_DownloadButton
    position absolute
    left 45%
    top 85%
    height 10%
    width 50%
    border-radius 50px 50px
    background-image url(images/downloadGooglePlay.png)
    background-size 100%
    box-shadow rgba(0, 0, 0, 0.5) 5px 5px
    color #64D597

#AppStoreBox
    position absolute
    left 40%
    top 10%
    bottom 10%
    width 20%
    height 80%
    background-repeat no-repeat
    background-size 100%
    background-image url(images/AppStore.jpg)
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px

#AppStore_DownloadButton
    position absolute
    left 45%
    top 85%
    height 10%
    width 50%
    border-radius 50px 50px
    background-image url(images/downloadAppStore.png)
    background-size 100%
    box-shadow rgba(0, 0, 0, 0.5) 5px 5px
    color #00AAF0

#DownloadAPKBox
    position absolute
    left 60%
    top 10%
    bottom 10%
    width 20%
    height 80%
    background-repeat no-repeat
    background-size 100%
    background-image url(images/Android.jpg)
    background-color #ffffff
    border-radius 10px
    box-shadow rgba(0, 0, 0, 0.50) 10px 10px

#DownloadAPK_DownloadButton
    position absolute
    left 45%
    top 85%
    height 10%
    width 50%
    border-radius 50px 50px
    background-image url(images/downloadAPK.png)
    background-size 100%
    box-shadow rgba(0, 0, 0, 0.5) 5px 5px
    color #00AAF0

#AboutDevelopers
    position absolute
    top 530%
    height 100%
    width 100%

#AboutDevelopersHeader
    position absolute
    top 14%
    left 30%
    width 45%
    height 10%
    background-image url(images/AboutDevelopersHeader.png)
    background-size 100%
    background-repeat no-repeat

#finishImg
    position absolute
    width 36%
    height 80%
    margin-top 10%
    margin-left 10%
    margin-bottom 10%

#finishText
    position absolute
    width 34%
    height 40%
    margin-top 20%
    margin-left 66%

#AboutUs
    position absolute
    top 630%
    height 40%
    width 100%

#headerAboutUs
    position absolute
    left 30%
    height 30%
    width 45%
    background-image url(images/AboutUs.png)
    background-repeat no-repeat
    background-size 100%

#vkontakte
    position absolute
    top 40%
    left 35%
    height 200px
    width 200px
    background-repeat no-repeat
    border-radius 50%
    background-image url(images/vk.png)
    background-size 100%
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px

#telegram
    position absolute
    top 40%
    left 55%
    height 200px
    width 200px
    background-repeat no-repeat
    border-radius 50%
    background-image url(images/telegram.png)
    background-size 100%
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.5) 10px 10px

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

#designBottom1
    position relative
    width 100%
    height 10%
    top 90%
    border-top-right-radius 100%
    border-top-left-radius 90%

#design4
    z-index 3
    position absolute
    width 100%
    height 10%
    border-bottom-right-radius 100%

#design5
    position absolute
    // top 90%
    width 100%
    height 10%
    border-top-left-radius 100%

#design6
    // position absolute
    width 100%
    height 10%
    border-bottom-left-radius 100%
    border-bottom-right-radius 100%

#design7
    position absolute
    // top 90%
    width 100%
    height 10%
    border-top-left-radius 100%
</style>
