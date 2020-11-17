<template lang="pug">
  .content-wrapper
    .topic-item(@click="openTopic()")
      .topic-item-header
        .topic-item-percentage

          .topicTitle
            .topic-item-title
              span.md-title {{title}}
            .topic-item-theme
              span  {{theme}}
          img.imgTopic(src="./images/school.png")
          //- vue-circle.percentageCircle(
          //- :progress='percentage',
          //- :size='60',
          //- :reverse='false',
          //- line-cap='round',
          //- :fill="{ color: 'rgba(38, 222, 129, 1)' }",
          //- empty-fill='rgba(204, 204, 204, .4)',
          //- :animation-start-value='0.0',
          //- :start-angle='-90',
          //- insert-mode='append',
          //- :thickness='5',
          //- :show-percent='true')
      //- .topic-item-body
      //-   .topic-item-title
      //-     strong.md-title {{title}}
      .LikeBox
        img#LikeImg(src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZEMzAxODsiIGQ9Ik0yNTYsNDgxYy0zLjUzLDAtNy4wNDYtMS4yMy05Ljg3My0zLjcwNmMtMjEuODI2LTE5LjA4Ny00Mi41ODMtMzYuNzgyLTYyLjEwOS01My40MjMNCglDNzMuODE3LDMyOS45NiwwLDI2Ny45MDksMCwxNzcuNTE0QzAsOTMuOTg4LDU5LjAzNywzMSwxMzYsMzFjNjAuNjU5LDAsOTkuNTk1LDQyLjM3OCwxMjAsODAuNTM3QzI3Ni40MDUsNzMuMzc4LDMxNS4zNDEsMzEsMzc2LDMxDQoJYzc2Ljk2MywwLDEzNiw2Mi45ODgsMTM2LDE0Ni41MTRjMCw5MC4zOTYtNzMuODE3LDE1Mi40NDYtMTg0LjAxOCwyNDYuMzU3Yy0xOS41MjYsMTYuNjQxLTQwLjI4MywzNC4zMzYtNjIuMTA5LDUzLjQyMw0KCUMyNjMuMDQ2LDQ3OS43NywyNTkuNTMsNDgxLDI1Niw0ODF6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTYxRTE0OyIgZD0iTTI2NS44NzMsNDc3LjI5NGMyMS44MjYtMTkuMDg3LDQyLjU4My0zNi43ODIsNjIuMTA5LTUzLjQyM0M0MzguMTgzLDMyOS45Niw1MTIsMjY3LjkwOSw1MTIsMTc3LjUxNA0KCUM1MTIsOTMuOTg4LDQ1Mi45NjMsMzEsMzc2LDMxYy02MC42NTksMC05OS41OTUsNDIuMzc4LTEyMCw4MC41MzdWNDgxQzI1OS41Myw0ODEsMjYzLjA0Niw0NzkuNzcsMjY1Ljg3Myw0NzcuMjk0eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=")
        //- img#LikeImg(src="./images/like.png")
        a#LikeText  {{like}}
        button.designButton.topic-item-solve Начать
          //- .topic-item
    //-   .topic-item-header
    //-     .topic-item-percentage

    //-       vue-circle.percentageCircle(
    //-       :progress='percentage',
    //-       :size='60',
    //-       :reverse='false',
    //-       line-cap='round',
    //-       :fill="{ color: 'rgba(38, 222, 129, 1)' }",
    //-       empty-fill='rgba(204, 204, 204, .4)',
    //-       :animation-start-value='0.0',
    //-       :start-angle='-90',
    //-       insert-mode='append',
    //-       :thickness='5',
    //-       :show-percent='true')

    //-       .topic-item-theme(v-if='theme.length < 9')
    //-         span
    //-           strong  {{theme}}
    //-       .topic-item-theme_gey(v-if='theme.length == 9')
    //-         span
    //-           strong  {{theme}}
    //-       .topic-item-theme_komba(v-if='theme.length > 9')
    //-         span
    //-           strong  {{theme}}

    //-   .topic-item-body
    //-     a.topic-item-title
    //-       strong.md-title {{title}}
    //-   a
    //-     .topic-item-solve(@click="openTopic()")
    //-       .button.button--round.designButton Решать
    //-   .LikeBox
    //-     img#LikeImg(src="./images/like.png")
    //-     a#LikeText  {{like}}

</template>

<script>
import VueCircle from 'vue2-circle-progress'
export default {

  components: {
    VueCircle
  },
  props: {
    id: {
      default: 0,
      type: Number
    },
    title: {
      default: 'Null',
      type: String
    },
    percentage: {
      default: 0,
      type: Number
    },
    theme: {
      default: '',
      type: String
    },
    like: {
      default: 0,
      type: Number
    }
  },
  methods: {
    openTopic (event) {
      this.$store.dispatch('changeCurrentTopic', this.title)
      this.$store.dispatch('changeCollection', 'tasks')
      this.$router.push('/lesson/tasks=' + this.title)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .md-title
    color #000000
    font-size 18pt
    font-weight 500
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif

  .button
    font-family: 'Roboto', sans-serif
    font-size 1.2em
    font-weight 400

  .LikeBox
    position: absolute; bottom: 0;
    height auto
    width 100%
    margin-top 3px
    margin-bottom 10px

  #LikeImg
    position relative
    height 25px
    width 25px
    margin 20px auto
    margin-left 20px
    vertical-align middle
  #LikeText
    position relative
    margin-left 4px
    font-size 15px
    color #763DCA
    margin 20px auto
    font-weight 600
    text-align center
    letter-spacing -0.7px
    vertical-align middle
    font-family: 'Roboto', sans-serif

  .designButton
    text-decoration none !important
    position relative
    padding-top 8px
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.5
    transition: 0.6s;
    text-align center
    vertical-align middle
    margin 15px auto
  .designButton:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA

  .content-wrapper
    max-height 400px

  .circle
    margin 5%

  .topic-item-header
    position relative
    height auto
    // background-color #601db3
    margin 0
    border-top-left-radius 30px
    border-top-right-radius 30px

  .topic-item-body
    height 45%
    padding 7%

  .topic-item
    position relative
    height 250px
    box-shadow 0px 0px 3px 1px #aaaaaa
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 1.2em
    color #FFFFFF
    background-color #FFFFFF
    border-radius 20px
    box-sizing: border-box;
    margin 5%
    cursor pointer
    max-width 400px
    &:hover
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  .topic-item-percentage
    font-size 2em

  .topicTitle
    position relative
    width 60%
    display inline-block
    margin-left 20px
    margin-top 20px
  .imgTopic
    position relative
    height auto
    width 20%
    float right
    margin-top 20px
    margin-right 20px
    display inline-block

  .topic-item-title
    display block
    color #000000
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 22px
    font-weight 600

  .topic-item-theme
    display block
    float left
    color #000000
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-weight 400
    font-size 18px
    margin 15px auto

  .topic-item-solve
    position relative
    height auto
    float right
    margin-bottom 0px
    margin-right 20px
</style>
