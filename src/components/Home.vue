<template lang="pug">
  .content-wrapper
    section.header-title(v-if="this.isLoading")
      .container
        h1.ui-title-1
          strong Темы
        .loading-indicator
          loading(
            :active.sync="this.isLoading",
            :is-full-page='false')
    section(v-if="!this.isLoading")
      .sidebar
        a(href='#school')
          img(src="@/components/images/school1.png", width= "50px", height = "50px")
        a(href='#examination')
          img(src="@/components/images/examination1.png", width= "50px", height = "50px")
        a(href='#geometry')
          img(src="@/components/images/geometry1.png", width= "50px", height = "50px")
        a(href='#algebra')
          img(src="@/components/images/algebra1.png", width= "50px", height = "50px")
        a(href='#komba')
          img(src="@/components/images/komba1.png", width= "50px", height = "50px")
        a(href='#logic')
          img(src="@/components/images/logic1.png", width= "50px", height = "50px")
        a(href='#graph')
          img(src="@/components/images/graph_icon1.png", width= "50px", height = "50px")
      .container
        .pesontedan
          input(id='pesontedan-one',type='checkbox', name='pesontedans')
          label(for='pesontedan-one')
            a(name='school')
              strong Школа
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('школа')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('школа')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-two',type='checkbox', name='pesontedans')
          label(for='pesontedan-two')
            a(name='examination')
              strong ОГЭ 2020
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('огэ')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('геометрия')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-three',type='checkbox', name='pesontedans')
          label(for='pesontedan-three')
            a(name='geometry')
              strong Геометрия
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('геометрия')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('геометрия')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-four',type='checkbox', name='pesontedans')
          label(for='pesontedan-four')
            a(name='algebra')
              strong Алгебра
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('алгебра')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('алгебра')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-five',type='checkbox', name='pesontedans')
          label(for='pesontedan-five')
            a(name='komba')
              strong Комбинаторика
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('комбинаторика')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "(topic, index) in getTopics.get('комбинаторика')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-six',type='checkbox', name='pesontedans')
          label(for='pesontedan-six')
            a(name='logic')
              strong Логика
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('логика')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('логика')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
        .pesontedan
          input(id='pesontedan-seven',type='checkbox', name='pesontedans')
          label(for='pesontedan-seven')
            a(name='graph')
              strong Графы
            //- p(:name='gggg').title_topic {{ array[0] }}
          .topic-list
            .topic-item-wrapper(
              v-for = "(topic, index) in getTopics.get('графы')",
              v-if='index<4',
              :key = "topic.id"
            )
              Topic(
                v-bind:id='topic.id',
                v-bind:title='topic.title'
                v-bind:percentage='topic.completed'
                v-bind:theme='topic.theme'
              )
          .pesontedan-content
            .topic-list
              .topic-item-wrapper(
                v-for = "topic in getTopics.get('графы')"
                :key = "topic.id"
              )
                Topic(
                  v-bind:id='topic.id',
                  v-bind:title='topic.title'
                  v-bind:percentage='topic.completed'
                  v-bind:theme='topic.theme'
                )
</template>

<script>
import Topic from './Topic.vue'
import Loading from 'vue-loading-overlay'
import { mapGetters, mapActions } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Topic,
    Loading
  },
  data () {
    return {
      isLoading: true
    }
  },
  computed: mapGetters(['getTopics', 'isTopicsLoaded']),
  async mounted () {
    await this.fetchTopics()
    this.isLoading = false
  },
  methods: mapActions(['fetchTopics'])
}
</script>

<style lang="stylus" scoped>

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

  .title_topic
    display grid
    color: #000
    font-family: 'Roboto', sans-serif
    font-size: 62px
    margin-left 25px
    margin-bottom 1%
    font-weight: bold

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(320px, 1fr))
    margin-top 0px
    margin-left 30px
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

  /* Ссылки при наведении мыши */
  .sidebar a:hover:not(.active)
    opacity 0.7
    -moz-opacity 0.7
    -khtml-opacity 0.7

  /* Содержание страницы. Значение свойства margin-left должно соответствовать значению свойства width боковой панели */
  div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
  }
  .pesontedan {
    position: relative;
    margin-bottom: 1px;
    width: 100%;
    color: #000;
    overflow: hidden;
  }

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
  /* :checked */
  .pesontedan input:checked ~ .pesontedan-content {
    max-height: 10000vh;
  }

  /* Icon */
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

  /* На экранах шириной менее 700 пикселей превратить боковую панель в верхнюю панель */
  @media screen and (max-width: 700px) {
    .sidebar {
      width 100%
      height auto
      position relative
      left 20%
      right 20%
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
      left 18%
      right 18%

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
      left 16%
      right 16%
    }
    .pesontedan label {
      margin-left 30px
      font-size: 35px
    }
  }

  .title_topic
    margin-left 60px

</style>
