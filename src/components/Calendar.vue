<template lang="pug">
  .content-wrapper
    p.md-display-1.titleCalendar(style="margin-bottom:40px") Олимпиадный календарь 2020 — 2021
    .statsTable(style="position:relative;height:1000px" )
        md-table(v-model='chatList' md-card='' style="position:relative;height:auto;margin-bottom:100px" md-sort='name' md-sort-order='asc' @md-selected='')
            md-table-row(slot='md-table-row' slot-scope='{ item }' md-selectable='single' @click='onSelected(item.link)')
                    md-table-cell.nameSlot(md-label='Дата', md-sort-by='name') {{ item.date }}
                    //- md-table-cell.taskSlot(v-for = '(task, taskIndex) in item' :key = 'taskIndex')
                    //-     p {{item.date}} {{item.name}}
                    md-table-cell.nameSlot(md-label='Название олимпиады', md-sort-by='name') {{ item.name }}
    Editor(:canvasWidth='Number(400)' :canvasHeight='Number(400)' style="background-color:red;border:2px;" ref='editor' :editorId='Number(1)')

    //- md-table
    //-     md-table-row
    //-         md-table-head Дата
    //-         md-table-head Название олимпиады

    //- .calendar-fragment
    //-     div(v-for = '(chats, i) in chatList'
    //-         @click = 'goToChat(chats.id)'
    //-         )
    //-             p {{chats.date}} {{chats.name}}
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'
import 'firebase/storage'
import Editor from 'vue-image-markup'

export default {
  data () {
    return {
      chatList: [],
      isHiddenResults: false
    }
  },
  components: {
    Editor
  },
  async mounted () {
    this.chatList.push({date: '10 Августа — 8 Ноября', name: 'Phystech.International, онлайн-этап', link: 'http://phystech.international/'})
    this.chatList.push({date: '24 Сентября', name: 'Всеросс по физике, школьный этап', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '28 Сентября — 5 Ноября', name: 'Высшая проба, регистрация на отборочный этап', link: 'https://olymp.hse.ru/mmo/math'})
    this.chatList.push({date: '4 Октября', name: 'Турнир им. Ломоносова', link: 'http://turlom.olimpiada.ru/'})
    this.chatList.push({date: '4 Октября', name: 'Всесибирская по математике, очный отборочный этап', link: 'https://sesc.nsu.ru/olymp-vsesib/'})
    this.chatList.push({date: '11 Октября', name: 'Турнир городов (осенний тур, базовый вариант)', link: 'https://www.turgor.ru/index.php'})
    this.chatList.push({date: '15 Октября — 11 Янвавря', name: 'Олимпиада СПбГУ, отборочный этап', link: 'https://olympiada.spbu.ru/'})
    this.chatList.push({date: '16 — 18 Октября', name: 'МОШ по физике, первое заочное задание', link: 'http://mosphys.olimpiada.ru/'})
    this.chatList.push({date: '19 Октября — 17 Января', name: 'Физтех, онлайн-этап', link: 'https://olymp.mipt.ru/'})
    this.chatList.push({date: '21 — 23 Октября', name: 'Всеросс по математике, школьный этап', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '22 — 29 Октября', name: 'Ломоносов по математике, отборочный этап', link: 'https://olymp.msu.ru/'})
    this.chatList.push({date: '25 Октября', name: 'Турнир городов (осенний тур, сложный вариант)', link: 'https://www.turgor.ru/index.php'})
    this.chatList.push({date: '29 Октября — 5 Ноября', name: 'Ломоносов по физике, отборочный этап', link: 'https://olymp.msu.ru/'})
    this.chatList.push({date: '5 — 12 Ноября', name: 'Ломоносов по механике, отборочный этап', link: 'https://olymp.msu.ru/'})
    this.chatList.push({date: '5 Ноября — 10 Декабря', name: 'Росатом, отборочный интернет-тур', link: 'https://admission.mephi.ru/olympiads/rosatom'})
    this.chatList.push({date: '8 Ноября', name: 'Всесибирская по физике, очный отборочный этап', link: 'https://sesc.nsu.ru/olymp-vsesib/'})
    this.chatList.push({date: '8 Ноября', name: 'Высшая проба по физике, отборочный этап', link: 'https://olymp.hse.ru/mmo/math'})
    this.chatList.push({date: '15 Ноября', name: 'Олимпиада Эйлера, первый дистанционный тур', link: 'http://matol.ru/'})
    this.chatList.push({date: '16 Ноября', name: 'Высшая проба по математике, отборочный этап', link: 'https://olymp.hse.ru/mmo/math'})
    this.chatList.push({date: '19 Ноября', name: 'Высшая проба по физике, отборочный этап', link: 'https://olymp.hse.ru/mmo/physics'})
    this.chatList.push({date: '19 Ноября — 21 Декабря', name: 'Покори Воробьёвы горы!, отборочный этап', link: 'https://pvg.mk.ru/'})
    this.chatList.push({date: '21 — 22 Ноября', name: 'Столичная олимпиада МФТИ', link: 'http://abitu.net/capital'})
    this.chatList.push({date: '22 Ноября', name: 'Высшая проба по математике, отборочный этап', link: 'https://olymp.hse.ru/mmo/math'})
    this.chatList.push({date: '27 Ноября', name: 'Всеросс по физике, муниципальный этап', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '29 Ноября', name: 'Олимпиада Эйлера, второй дистанционный тур', link: 'http://matol.ru/'})
    this.chatList.push({date: '4 — 6 Декабря', name: 'МОШ по физике, второе заочное задание', link: 'http://mosphys.olimpiada.ru/'})
    this.chatList.push({date: '6 Декабря', name: 'Всеросс по математике, муниципальный этап (9 — 11)', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '10 Декабря', name: 'Всеросс по математике, муниципальный этап (7 — 8)', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '13 Декабря', name: 'Олимпиада Эйлера, третий дистанционный тур', link: 'http://matol.ru/'})
    this.chatList.push({date: '25 Декабря — 15 Января', name: 'Всесибирская, заочный отборочный этап', link: 'https://sesc.nsu.ru/olymp-vsesib/'})
    this.chatList.push({date: '15 — 17 Января', name: 'МОШ по физике, третье заочное задание', link: 'http://mosphys.olimpiada.ru/'})
    this.chatList.push({date: '23, 25 января', name: 'Олимпиада Максвелла, региональный этап', link: 'http://mosphys.olimpiada.ru/maxwell'})
    this.chatList.push({date: '23, 25 января', name: 'Всеросс по физике, региональный этап', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '5 — 6 Февраля', name: 'Олимпиада Эйлера, региональный этап', link: 'http://matol.ru/'})
    this.chatList.push({date: '5 — 6 Февраля', name: 'Всеросс по математике, региональный этап', link: 'https://vos.olimpiada.ru/'})
    this.chatList.push({date: '20 Февраля', name: 'Физтех по математике, заключительный этап', link: 'https://olymp.mipt.ru/'})
    this.chatList.push({date: '21 Февраля', name: 'Физтех по физике, заключительный этап', link: 'https://olymp.mipt.ru/'})
    this.$refs.editor.set('freeDrawing') // устанавливаем опции для черновика
  },
  methods: {
    onSelected (link) {
      console.log(link)
      if (link != null) window.location.href = link
    }
  }

}
</script>

<style lang="stylus" scoped>
  .statsTable
    position relative
    width 60%
    margin-left 20%
    align-items center
    justify-content flex-end
    @media screen and (max-width: 1200px)
      width 80%
      margin-left 10%
    @media screen and (max-width: 1200px)
      width 90%
      margin-left 5%
  .titleCalendar
    text-align: center
    margin-top 70px
    @media screen and (max-width: 1200px)
      margin-top 20px
  .calendar-fragment
    position relative
    width 60%
    background-color #FCFCFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
  .md-table + .md-table
    margin-top: 16px
</style>
