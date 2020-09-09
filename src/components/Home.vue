<template lang="pug">
  .content-wrapper
    section.header-title(v-if="(this.isLoading && !this.error) || this.arrayPopular.length === 0")
      .container
        h1.ui-title-1
          strong Темы
        .loading-indicator
          loading(
            :active.sync = "this.trueVar"
            :is-full-page = 'false'
            color = "#763dca"
            opacity = 0)
    section(v-if = "!this.isLoading && !this.error && this.arrayPopular.length !== 0")
      .sidebar
        <a href="#school" v-smooth-scroll>
          img(src="@/components/images/school1.png", width= "50px", height = "50px")
        </a>
        <a href="#examination" v-smooth-scroll>
          img(src="@/components/images/examination1.png", width= "50px", height = "50px")
        </a>
        <a href="#geometry" v-smooth-scroll>
          img(src="@/components/images/geometry1.png", width= "50px", height = "50px")
        </a>
        <a href="#algebra" v-smooth-scroll>
          img(src="@/components/images/algebra1.png", width= "50px", height = "50px")
        </a>
        <a href="#komba" v-smooth-scroll>
          img(src="@/components/images/komba1.png", width= "50px", height = "50px")
        </a>
        <a href="#logic" v-smooth-scroll>
          img(src="@/components/images/logic1.png", width= "50px", height = "50px")
        </a>
        <a href="#graphs" v-smooth-scroll>
          img(src="@/components/images/graph_icon1.png", width= "50px", height = "50px")
        </a>

      .joinCustomTitle(@click="joinMenuShow = !joinMenuShow")
        .button.button--round.button-success.right_button.mdc-fab.mdc-fab--extended.button--round.bottom-button
          .mdc-fab__ripple
          span.material-icons.mdc-fab__icon add
          span.mdc-fab__label Присоединиться
      .container
        .pesontedan
          input(id='pesontedan-eight',type='checkbox', name='pesontedans')
          label(for='pesontedan-eight')
            a.title_topic2
              strong Популярные
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayPopular",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in getTopics.get('популярные')"
                v-if='index>=4 && index<12',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        .pesontedan
          input(id='pesontedan-two',type='checkbox', name='pesontedans')
          label#school(for='pesontedan-two')
            a.title_topic2(name='school')
              strong Школа
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arraySchool",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arraySchool"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        .pesontedan
          input(id='pesontedan-three',type='checkbox', name='pesontedans')
          label#examination(for='pesontedan-three')
            a.title_topic2(name='examination')
              strong ОГЭ 2020
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayOGE",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arrayOGE"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        .pesontedan
          input(id='pesontedan-four',type='checkbox', name='pesontedans')
          label#geometry(for='pesontedan-four')
            a.title_topic2(name='geometry')
              strong Геометрия
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayGeometry",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arrayGeometry"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        .pesontedan
          input(id='pesontedan-five',type='checkbox', name='pesontedans')
          label#algebra(for='pesontedan-five')
            a.title_topic2(name='algebra')
              strong Алгебра
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayAlgebra",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arrayAlgebra"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        .pesontedan
          input(id='pesontedan-six',type='checkbox', name='pesontedans')
          label#komba(for='pesontedan-six')
            a.title_topic2(name='komba')
              strong Комбинаторика
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayKomba",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arrayKomba"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
        //- .pesontedan
        //-   input(id='pesontedan-seven',type='checkbox', name='pesontedans')
        //-   label#logic(for='pesontedan-seven')
        //-     a.title_topic2(name='logic')
        //-       strong Логика
        //-     //- p(:name='gggg').title_topic {{ array[0] }}
        //-   .topic-list
        //-     .topic-item-wrapper(
        //-       v-for = "(topic, index) in this.arrayLogics",
        //-       v-if='index<4',
        //-       :key = "topic.id"
        //-     )
        //-       Topic(
        //-         v-bind:id='topic.id',
        //-         v-bind:title='topic.title'
        //-         v-bind:percentage='topic.completed'
        //-         v-bind:theme='topic.theme'
        //-         v-bind:like='topic.like'
        //-       )
        //-   .pesontedan-content
        //-     .topic-list
        //-       .topic-item-wrapper(
        //-         v-for = "(topic, index) in this.arrayLogics"
        //-         v-if='index>=4',
        //-         :key = "topic.id"
        //-       )
        //-         Topic(
        //-           v-bind:id='topic.id',
        //-           v-bind:title='topic.title'
        //-           v-bind:percentage='topic.completed'
        //-           v-bind:theme='topic.theme'
        //-           v-bind:like='topic.like'
        //-         )
        .pesontedan
          input(id='pesontedan-nine',type='checkbox', name='pesontedans')
          label#graphs(for='pesontedan-nine')
            a.title_topic2(name='graphs')
              strong Графы
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayGraphs",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
                v-bind:like='topic.like'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in this.arrayGraphs"
                v-if='index>=4',
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                  v-bind:like='topic.like'
                )
    .joinMenu(v-if = 'this.joinMenuShow')
      .joinMenuBox
        .joinMenuText
          span.md-headline Введите ключ темы
        .joinMenuField
          input(
                  type="text"
                  :placeholder="this.placeholder"
                  v-model="customTopicId"
          )
        .joinMenuCancel
          .button.button--round.button-success(@click ='joinCourse(customTopicId)') Подключиться
          .button.button--round.button-warning(@click ='joinMenuShow = false')  Отмена
    .errorBox(v-if = 'this.error')
      strong.marginText.errorText Ой-ой... :(
      br
      span.marginTex Похоже, что-то пошло не так.
      br
      span.marginTex Пожалуйста, проверьте свое подключение к интернету.
</template>

<script>
import Topic from './Topic.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Topic,
    Loading
  },
  data () {
    return {
      arrayPopular: [],
      arraySchool: [],
      arrayOGE: [],
      arrayGeometry: [],
      arrayAlgebra: [],
      arrayKomba: [],
      arrayLogics: [],
      arrayGraphs: [],
      isLoading: true,
      joinMenuShow: false,
      customTopicId: '',
      error: false,
      trueVar: true,
      placeholder: 'Введите ключ темы'
    }
  },
  computed: mapGetters(['getTopics', 'isTopicsLoaded', 'getUser', 'getCustomTopic']),
  async mounted () {
    if (this.getUser === null) this.$router.push('/login')
    try {
      console.log('Fetching...')
      await this.fetchTopics()
      console.log('Topics fetched')
      this.arrayPopular = await this.$store.getters.getTopics.get('популярные')
      this.arraySchool = await this.$store.getters.getTopics.get('школа')
      this.arrayOGE = await this.$store.getters.getTopics.get('огэ')
      this.arrayGeometry = await this.$store.getters.getTopics.get('геометрия')
      this.arrayAlgebra = await this.$store.getters.getTopics.get('алгебра')
      this.arrayKomba = await this.$store.getters.getTopics.get('комбинаторика')
      this.arrayLogics = await this.$store.getters.getTopics.get('логика')
      this.arrayGraphs = await this.$store.getters.getTopics.get('графы')
      console.log('Topics loaded', this.arrayGraphs)
    } catch (error) {
      this.error = true
      throw error
    }
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchTopics', 'fetchCustomTopic']),
    async joinCourse (id) {
      await this.fetchCustomTopic(id)
      var res = this.getCustomTopic
      if (res !== null) {
        this.$router.push('/lesson/olympiad=' + id)
      } else {
        this.customTopicId = ''
        this.placeholder = 'Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа'
        alert('Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content-wrapper
    min-height 0
  .marginText
    position relative
    margin 20px
  .errorText
    text-color #763dca
  label
    background-color #fafafa !important
  .md-headline
    font-size 1em
  strong
    color #000000
  .joinMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    .button
      font-size 0.6em
      margin 2%
  .joinMenuText
    font-size 1.3em
    padding-bottom 10%

  .joinMenuField
    input
      border-color #000000
      border-width 1%

  .errorBox
    padding-top 10%
    text-align center
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2em
    strong
      font-size 2em

  .joinCustomTitle
    z-index 10000
    position fixed
    bottom 100px
    right 100px
  .bottom-button
    box-shadow 0px 0px 10px rgba(0,0,0,2)

  .right_button
    position fixed
    bottom 20px
    font-size 22px
    background #763dca
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    width auto
    font-weight 500
    height auto
    right 20px

  .joinMenu
    z-index 50000
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .joinMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px

  .ui-title-1
    font-size 4em

  .header-title
    margin-top 10px
    padding 0

  .loading-indicator
    padding-top 300px

  .topic-item-wrapper
    height 400px

  .container
    align-items center
    max-width 1600px

  .ui-title-1
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    padding-top 4%
    text-align center

  .title_topic2
    position relative
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    color: #000000
    font-size: 1em
    margin-top 500px
    font-weight: 100

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(320px, 1fr))
    margin-top 0px
    margin-left 2%
    margin-right 2%
  .ui-card
    border-width 1px
    background-color #763DCA

  .sidebar
    margin-top 100px
    padding 0
    width 65px
    bottom 0
    top 0
    height 100%
    overflow auto
  .sidebar a
    display block
    margin-top 50%
    margin-left 10%
    margin-right 5%
    padding 1px
    text-decoration none

  .sidebar img
    box-shadow 0 0 7px rgba(0,0,0,0.5)
    border-radius 100%

  .sidebar a:hover:not(.active)
    opacity 0.7
    -moz-opacity 0.7
    -khtml-opacity 0.7

  div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
  }
  .pesontedan
    position relative
    margin-bottom 5%
    width 100%
    color #000
    overflow hidden
    border solid
    border-radius 30px
    border-color #999999
    border-width 2px
    box-shadow 0 0 15px #cccccc
    @media screen and (max-width: 700px)
      border none
      box-shadow none

  .pesontedan input {
    position: absolute;
    height: 70px
    opacity: 0;
    z-index: -1;
  }

  .pesontedan label {
    position: relative;
    display: block;
    padding: 0 0 0 1em;
    background: #ffffff;
    line-height: 3;
    cursor: pointer;
    text-shadow: 0 1px 0 #333131;
    margin-left 25px
    font-size: 50px;
  }

  .pesontedan-content {
    max-height: 0;
    overflow: hidden;
    background: #ffffff;
    transition: max-height .40s;
    color: #ffffff;
    text-shadow: 0 1px 0 #292727;
  }

  .pesontedan-content {
    background: #ffffff;
  }
  .pesontedan-content p {
    margin: 1em;
  }
  .pesontedan input:checked ~ .pesontedan-content {
    max-height: 10000vh;
  }

  .pesontedan label::after {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 3em;
    height: 3em;
    line-height: 3;
    text-align: center;
    -webkit-transition: all .40s;
    -o-transition: all .40s;
    transition: all .40s;
  }
  .pesontedan input[type=checkbox] + label::after {
    content: "+";
  }
  .pesontedan input[type=radio] + label::after {
    content: "\25BC";
  }
  .pesontedan input[type=checkbox]:checked + label::after {
    transform: rotate(315deg);
  }
  .pesontedan input[type=radio]:checked + label::after {
    transform: rotateX(180deg);
  }

  @media screen and (max-width: 700px) {
    .sidebar {
      position relative
      width 80%
      height auto
      margin-left 10%
      margin-right 10%
      top 0
      margin auto
      float top
    }

    .sidebar a {
      float left
      margin-top 5px
      margin-left 1%
      margin-right 1%
    }
    .sidebar img {
      box-shadow 0 0 2px rgba(0,0,0,0.5)
      height: 40px
      max-height: 40px
      min-height: 40px
      width: 40px
      max-width: 40px
      min-width: 40px
    }
    div.content{
      margin-left 0
    }
  }

  @media screen and (max-width: 500px)
    .title_topic
      font-size 40px
      marhin-left 30px
    .sidebar img
      box-shadow 0 0 2px rgba(0,0,0,0.5)
      height: 35px
      max-height: 35px
      min-height: 35px
      width: 35px
      max-width: 35px
      min-width: 35px
    .sidebar
      width 90%
      left 10%
      right 10%
      // left 18%
      // right 18%

    .pesontedan label
      margin-left 30px
      font-size 40px

  @media screen and (max-width: 400px) {
    .title_topic{
      font-size 35px
      marhin-left 30px
    }
    .sidebar img {
      box-shadow 0 0 2px rgba(0,0,0,0.5)
      height: 30px
      max-height: 30px
      min-height: 30px
      width: 30px
      max-width: 30px
      min-width: 30px
    }
    .sidebar {
      width 80%
      left 10%
      rigth 10%
      // left 16%
      // right 16%
    }
    .pesontedan label {
      margin-left 30px
      font-size: 35px
    }
  }

  .title_topic
    margin-left 60px

</style>
