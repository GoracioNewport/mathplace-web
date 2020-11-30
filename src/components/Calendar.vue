<template lang="pug">
  .content-wrapper
    p.md-display-1.titleCalendar Олимпиадный календарь 2020-2021
    .statsTable
        md-table(v-model='chatList' md-card='' style="height:1000px" md-sort='name', md-sort-order='asc', md-fixed-header='' @md-selected='')
            md-table-row(to='http://phystech.international/' slot='md-table-row' style="height:auto" slot-scope='{ item }' md-selectable='single' @click='onSelected(item.link)')
                    md-table-cell.nameSlot(md-label='Дата', md-sort-by='name') {{ item.date }}
                    //- md-table-cell.taskSlot(v-for = '(task, taskIndex) in item' :key = 'taskIndex')
                    //-     p {{item.date}} {{item.name}}
                    md-table-cell.nameSlot(md-label='Название олимпиады', md-sort-by='name') {{ item.name }}

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

export default {
  data () {
    return {
      chatList: [],
      isHiddenResults: false
    }
  },
  async mounted () {
    this.chatList.push({date: '10 Августа — 8 Ноября', name: 'Phystech.International, онлайн-этап', link: 'http://phystech.international/'})
    this.chatList.push({date: '24 Сентября', name: 'Всеросс по физике, школьный этап'})
    this.chatList.push({date: '28 Сентября — 5 Ноября', name: 'Высшая проба, регистрация на отборочный этап'})
    this.chatList.push({date: '4 Октября', name: 'Турнир им. Ломоносова Всесибирская по математике, очный отборочный этап'})
    this.chatList.push({date: '11 Октября', name: 'Турнир городов (осенний тур, базовый вариант)'})
    this.chatList.push({date: '15 Октября — 11 Янвавря', name: 'Олимпиада СПбГУ, отборочный этап'})
    this.chatList.push({date: '16 — 18 Октября', name: 'МОШ по физике, первое заочное задание'})
    this.chatList.push({date: '19 Октября — 17 Января', name: 'Физтех, онлайн-этап'})
    this.chatList.push({date: '21 — 23 Октября', name: 'Всеросс по математике, школьный этап'})
    this.chatList.push({date: '22 — 29 Октября', name: 'Ломоносов по математике, отборочный этап'})
    this.chatList.push({date: '25 Октября', name: 'Турнир городов (осенний тур, сложный вариант)'})
    this.chatList.push({date: '29 Октября — 5 Ноября', name: 'Ломоносов по физике, отборочный этап'})
    this.chatList.push({date: '5 — 12 Ноября', name: 'Ломоносов по механике, отборочный этап'})
    this.chatList.push({date: '5 Ноября — 10 Декабря', name: 'Росатом, отборочный интернет-тур'})
    this.chatList.push({date: '8 Ноября', name: 'Всесибирская по физике, очный отборочный этап'})
    this.chatList.push({date: '8 Ноября', name: 'Высшая проба по физике, отборочный этап'})
    this.chatList.push({date: '15 Ноября', name: 'Олимпиада Эйлера, первый дистанционный тур'})
    this.chatList.push({date: '16 Ноября', name: 'Высшая проба по математике, отборочный этап'})
    this.chatList.push({date: '19 Ноября', name: 'Высшая проба по физике, отборочный этап'})
    this.chatList.push({date: '19 Ноября — 21 Декабря', name: 'Покори Воробьёвы горы!, отборочный этап'})
    this.chatList.push({date: '21 — 22 Ноября', name: 'Столичная олимпиада МФТИ'})
    this.chatList.push({date: '22 Ноября', name: 'Высшая проба по математике, отборочный этап'})
    this.chatList.push({date: '27 Ноября', name: 'Всеросс по физике, муниципальный этап'})
    this.chatList.push({date: '29 Ноября', name: 'Олимпиада Эйлера, второй дистанционный тур'})
    this.chatList.push({date: '4 — 6 Декабря', name: 'МОШ по физике, второе заочное задание'})
    this.chatList.push({date: '6 Декабря', name: 'Всеросс по математике, муниципальный этап (9 — 11)'})
    this.chatList.push({date: '10 Декабря', name: 'Всеросс по математике, муниципальный этап (7 — 8)'})
    this.chatList.push({date: '13 Декабря', name: 'Олимпиада Эйлера, третий дистанционный тур'})
    this.chatList.push({date: '25 Декабря — 15 Января', name: 'Всесибирская, заочный отборочный этап'})
    this.chatList.push({date: '15 — 17 Января', name: 'МОШ по физике, третье заочное задание'})
    this.chatList.push({date: '23, 25 января', name: 'Олимпиада Максвелла, региональный этап'})
    this.chatList.push({date: '23, 25 января', name: 'Всеросс по физике, региональный этап'})
    this.chatList.push({date: '5 — 6 Февраля', name: 'Олимпиада Эйлера, региональный этап'})
    this.chatList.push({date: '5 — 6 Февраля', name: 'Всеросс по математике, региональный этап'})
    this.chatList.push({date: '20 Февраля', name: 'Физтех по математике, заключительный этап'})
    this.chatList.push({date: '21 Февраля', name: 'Физтех по физике, заключительный этап'})
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
        height auto
        width 60%
        margin-left 20%
        align-items center
        justify-content flex-end
    .titleCalendar
        text-align: center;
        margin-top 70px
    .calendar-fragment
        width 60%
        background-color #FCFCFF
        box-shadow 0 0 5px rgba(0,0,0,0.5)
        border-radius 20px 20px 20px 20px
    .md-table + .md-table {
        margin-top: 16px
    }
</style>
