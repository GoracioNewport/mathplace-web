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
            :opacity = 0)
    section(v-if = "!this.isLoading && !this.error && this.arrayPopular.length !== 0")
      //- .sidebar
      //-   a(href='#school', v-smooth-scroll='')
      //-     img(src="@/components/images/school1.png", width= "50px", height = "50px")
      //-   a(href='#examination', v-smooth-scroll='')
      //-     img(src="@/components/images/examination1.png", width= "50px", height = "50px")
      //-   a(href='#geometry', v-smooth-scroll='')
      //-     img(src="@/components/images/geometry1.png", width= "50px", height = "50px")
      //-   a(href='#algebra', v-smooth-scroll='')
      //-     img(src="@/components/images/algebra1.png", width= "50px", height = "50px")
      //-   a(href='#komba', v-smooth-scroll='')
      //-     img(src="@/components/images/komba1.png", width= "50px", height = "50px")
      //-   a(href='#logic', v-smooth-scroll='')
      //-     img(src="@/components/images/logic1.png", width= "50px", height = "50px")
      //-   a(href='#graphs', v-smooth-scroll='')
      //-     img(src="@/components/images/graph_icon1.png", width= "50px", height = "50px")
      md-dialog(:md-active.sync='showCreateClass')
        md-dialog-title Создать класс
        .settingsMenuBox(style="margin:20px; margin-top:0px")
          md-field(style="width:500px" md-inline='')
            label Введите название класса
            md-input(v-model='newName')

          md-field(md-inline='')
            label Введите предмет
            md-input(v-model='newName')
        md-dialog-actions
          md-button.md-primary(@click='showCreateClass=false') Закрыть
          md-button.md-primary(@click='saveProfile') Сохранить
      button.designButtonLesson.bottom-button(@click='showCreateClass = true') Присоединиться к уроку
      .joinCustomTitle(@click="joinMenuShow = !joinMenuShow, showDialog = true")
        button.designButtonLesson.bottom-button Присоединиться к уроку

      .container
        .AllSection
          //- button.designButtonLessonTop(@click="joinMenuShow = true, showDialog = true") Присоединиться к уроку
          .title_topic2
            p Разделы
          .AllSections
              a.Section(href='#school', style="background-color: #E9EBFA; color:#3e50cb;", v-smooth-scroll='')
                //- img(src="@/components/images/school1.png")
                p.title Школа
                p.text {{arraySchool.length}} урока
              a.Section(href='#examination', style="background-color: #e7f2ff; color:#1466c6;", v-smooth-scroll='')
                //- img(src="@/components/images/examination1.png")
                p.title Экзамены
                p.text {{arrayOGE.length}} урока
              a.Section(href='#geometry', style="background-color: #e9f9e9; color:#288b28;", v-smooth-scroll='')
                //- img(src="@/components/images/geometry1.png")
                p.title Геометрия
                p.text {{arrayGeometry.length}} урока
              a.Section(href='#algebra', style="background-color: #ffeede; color:#ff810a;", v-smooth-scroll='')
                //- img(src="@/components/images/algebra1.png")
                p.title Алгебра
                p.text {{arrayAlgebra.length}} урока
              a.Section(href='#komba', style="background-color: #E9EBFA; color:#3e50cb;", v-smooth-scroll='')
                //- img(src="@/components/images/komba1.png")
                p.title Комбинаторика
                p.text {{arrayKomba.length}} урока
              a.Section(href='#logic', style="background-color: #e7f2ff; color:#1466c6;", v-smooth-scroll='')
                //- img(src="@/components/images/logic1.png")
                p.title Логика
                p.text {{arrayGraphs.length}} урока
              a.Section(href='#graphs', style="background-color: #e9f9e9; color:#288b28;", v-smooth-scroll='')
                //- img(src="@/components/images/graph_icon1.png")
                p.title Графы
                p.text {{arraySchool.length}} урока

        .pesontedan
          input(v-id="this.arrayPopular.length > 4",id='pesontedan-eight',type='checkbox', name='pesontedans')
          label(for='pesontedan-eight')
            a.title_topic2
              span Популярные
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
              span Школа
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
              span ОГЭ 2020
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
              span Геометрия
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
              span Алгебра
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
          input(v-if="this.arrayKomba.length > 4", id='pesontedan-six',type='checkbox', name='pesontedans')
          label#komba(for='pesontedan-six')
            a.title_topic2(name='komba')
              span Комбинаторика
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
        .pesontedan
          input(v-if="this.arrayLogics.length > 4", id='pesontedan-seven',type='checkbox', name='pesontedans')
          label#logic(for='pesontedan-seven')
            a.title_topic2(name='logic')
              span Логика
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in this.arrayLogics",
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
                v-for = "(topic, index) in this.arrayLogics"
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
          input(v-if="this.arrayGraphs.length > 4", id='pesontedan-nine',type='checkbox', name='pesontedans')
          label#graphs(for='pesontedan-nine')
            a.title_topic2(name='graphs')
              span Графы
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
    div(v-if = 'joinMenuShow')
      md-dialog(:md-active.sync='showDialog')
        md-dialog-title Подключиться к уроку
        p(style="margin:20px;margin-top:0px;") У каждого урока есть свой уникальный код.<br> Введите код урока или попросите учителя отправить его вам
        div(style="margin:20px;margin-top:0px;")
          md-field
            label Введите код урока...
            md-input(v-model="customTopicId" md-counter='5')
        md-dialog-actions
          md-button.md-primary(@click='showDialog = false,joinMenuShow = false') Отмена
          md-button.md-primary(@click ='joinCourse(customTopicId)') Подключиться

      //- md-dialog-prompt(@click ='joinCourse(customTopicId)', :md-active.sync='showDialog' v-model='customTopicId' md-title="Введите код урока" md-input-maxlength='6' md-input-placeholder='Код урока...' md-confirm-text='Подключиться' md-cancel-text="Отмена")
        //- md-button.md-primary.md-raised(@click='active = true') Подключиться
        //- span(v-if='value') Value: {{ value }}
      //- .joinMenuMain
      //-   img(src="@/components/images/clear.png", @click ='joinMenuShow = false; groupChat = false').delete_button
      //-   .joinMenuBox
      //-     .joinMenuText
      //-       span.md-headline Введите ключ темы
      //-     .joinMenuField
      //-       input(
      //-               type="text"
      //-               :placeholder="this.placeholder"
      //-               v-model="customTopicId"
      //-       )
      //-     .joinMenuCancel
      //-       button.button--round.designButtonLesson(@click ='joinCourse(customTopicId)') Подключиться
      //-       //- .button.button--round.button-warning(@click ='joinMenuShow = false')  Отмена
      //- .errorBox(v-if = 'this.error')
      //-   strong.marginText.errorText Ой-ой... :(
      //-   br
      //-   span.marginTex Похоже, что-то пошло не так.
      //-   br
      //-   span.marginTex Пожалуйста, проверьте свое подключение к интернету.
      //- md-dialog-prompt(:md-active.sync='active' v-model='value' md-title="What's your name?" md-input-maxlength='30' md-input-placeholder='Type your name...' md-confirm-text='Done')
      //-   md-button.md-primary.md-raised(@click='active = true') Prompt
      //-   span(v-if='value') Value: {{ value }}
</template>

<script>
import Topic from './Topic.vue'
// import TopicNewModal from './TopicNewModal.vue'
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
      showCreateClass: false,
      showDialog: false,
      joinMenuShow: false,
      customTopicId: '',
      error: false,
      trueVar: true,
      placeholder: 'Введите ключ темы'
    }
  },
  computed: mapGetters(['getTopics', 'isTopicsLoaded', 'getUser', 'getCustomTopic']),
  async mounted () {
    try {
      await this.fetchTopics()
      this.arrayPopular = await this.$store.getters.getTopics.get('популярные')
      this.arraySchool = await this.$store.getters.getTopics.get('школа')
      this.arrayOGE = await this.$store.getters.getTopics.get('огэ')
      this.arrayGeometry = await this.$store.getters.getTopics.get('геометрия')
      this.arrayAlgebra = await this.$store.getters.getTopics.get('алгебра')
      this.arrayKomba = await this.$store.getters.getTopics.get('комбинаторика')
      this.arrayLogics = await this.$store.getters.getTopics.get('логика')
      this.arrayGraphs = await this.$store.getters.getTopics.get('графы')
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
        this.$router.push('/lesson/olympiads=' + id)
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
  ::-webkit-scrollbar-button
    background-image:url('');
    background-repeat:no-repeat;
    width:0px;
    height:0px

  ::-webkit-scrollbar-track
    background-color:#ecedee

  ::-webkit-scrollbar-thumb
    -webkit-border-radius: 0px;
    border-radius: 20px;
    background-color #763DCA

  ::-webkit-scrollbar-thumb:hover
    background-color:#56999f;

  ::-webkit-resizer
    background-image:url('');
    background-repeat:no-repeat;
    width:0px;
    height:0px

  ::-webkit-scrollbar
    width: 0px;
    height 0px

  .joinMenuMain
    positine relative
    height auto
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border-radius 10px
  .delete_button
    position relative
    display inline-block
    width 40px
    cursor pointer
    height 40px
    margin-top 20px
    margin-right 20px
    float right
  .designButtonLesson
    padding-top 12.5px
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 23px
    margin-left 20px
    opacity 0.85
    margin-top 20px
    color #763DCA !important
    background-color #FFFFFF
    transition: 0.6s;
    text-align center
    vertical-align middle
    @media screen and (max-width: 300px)
      display none
  .designButtonLesson:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .designButtonLessonTop
    padding-top 8px
    position relative
    width auto
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 23px
    margin 10px
    margin-bottom 40px
    opacity 0.85
    margin-top 20px
    color #763DCA !important
    background-color #FFFFFF
    transition: 0.6s;
    display none
    @media screen and (max-width: 480px)
      display block
  .designButtonLessonTop:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA

  // .AllSections::-webkit-scrollbar {width:0px;height:0px;}
  .AllSections
    position relative
    height auto
    width 100%
    margin-bottom 0px
    overflow: auto;
    white-space:nowrap;
  .AllSection
    position relative
    width: 100%;
    height: 100%;
    margin-bottom 50px
    // overflow: auto;
  .Section
    height 110px
    width 250px
    background: #fc0;  /* Цвет фона */
    display inline-block
    background-color #ffffff
    margin 10px
    border-radius 20px
    border-width 0px
    box-shadow 0px 0px 2px
    &:hover
      box-shadow 0px 0px 4px 0px
    img
      width 100px
      height auto
      padding 10px
      text-align center
      margin 10px 0px
    .title
      width auto
      margin-top 20px
      margin-left 20px
      margin-bottom 20px
      text-decoration none !important
      font-weight 600
      font-size 20px
    .text
      position relative
      text-decoration none !important
      width auto
      margin-top 40px
      float bottom
      margin-left 20px
      font-size 14px
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
    font-weight 500
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 24pt
  strong
    color #000000
  .joinMenuBox
    padding 6%
    // padding-left 10%
    // padding-right 10%
    .button
      margin 2%
  .joinMenuText
    font-size 1.3em
    padding-bottom 10%

  .joinMenuField
    height auto
    input
      border-color #000000
      border-width 1%
      padding 10px
      font-size 18px

  .errorBox
    padding-top 10%
    text-align center
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2em
    strong
      font-size 2em

  .joinCustomTitle
    z-index 3
    position fixed
    bottom 30px
    right 20px
    @media screen and (max-width: 480px)
      display none

  .bottom-button
    box-shadow 0px 0px 3px 0px
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
    z-index 7
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
    border 0px #000000 solid
    border-radius 25px
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%

  .ui-title-1
    font-size 4em

  .header-title
    margin-top 10px
    padding 0

  .loading-indicator
    padding-top 300px

  .topic-item-wrapper
    height auto
    margin-bottom 30px

  .container
    align-items center
    max-width 1600px

  .ui-title-1
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    padding-top 4%
    text-align center

  .title_topic2
    position relative
    height auto
    font-family: "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
    display block
    margin-left 0px
    margin-bottom 20px
    font-weight: 400
    font-size: 35pt
    &:hover
      text-decoration none;
    p
      height auto
      width auto
      color: #000000
      margin-top 20px
    span
      font-family: "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
      font-weight 400
      color: #000000

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
    z-index 4
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
    border-radius 20px
    border-color #999999
    border-width 0px
    box-shadow 0 0 2px 0px
    // &:hover
    //   box-shadow 0 0 5px 0px
    @media screen and (max-width: 700px)
      border none
      box-shadow none

  .pesontedan input {
    position: absolute;
    height: 70px
    opacity: 0;
    z-index: -1;
  }

  .pesontedan label
    position: relative;
    height auto
    display: block;
    background: #ffffff;
    line-height: 3;
    cursor: pointer;
    text-shadow: 0 1px 0 #333131;
    margin-left 50px
    font-size: 50px;
    @media screen and (max-width: 700px)
      border none
      margin-left 0px
      box-shadow none

  .pesontedan-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height .40s;
  }

  .pesontedan-content {
  }
  .pesontedan-content p {
    margin: 1em;
  }
  .pesontedan input:checked ~ .pesontedan-content {
    max-height: 10000vh;
  }

  .pesontedan label::after {
    position: absolute;
    right: 20px;
    top: 0;
    // float right
    display: block;
    width: 3em;
    height: 3em;
    line-height: 3;
    text-align: center;
    -webkit-transition: all .40s;
    -o-transition: all .40s;
    transition: all .40s;
    @media screen and (max-width: 700px) {
      right: 0px;
      top: 20px;
    }
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
      margin-left 0px
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
      margin-left 0px
      font-size: 35px
    }
  }

  .title_topic
    margin-left 60px

</style>
