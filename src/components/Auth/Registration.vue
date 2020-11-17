<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth-title
            span.ui-title-2
              strong Android приложение
            //img(class="picture", src='@/assets/saluting.png', alt='Пикча')
            //img(class="picture", src='@/assets/gestures.png', alt='Пикча')
            //img(class="picture", src='@/assets/birthday-and-party.png', alt='Пикча')
            //img(class="picture", src='@/assets/miscellaneous.png', alt='Пикча')
            a(href="https://play.google.com/store/apps/details?id=com.math4.user.mathplace")
              //img(class="picture", src='@/assets/google_play.svg', alt='Пикча')
              img(class="picture", src='@/assets/googleplay.png', alt='Наше приложение')
            span.ui-title-2.textTop
              strong Интсрукции
            a.openIns(href="./BroshureFinal.pdf")
              p Скачать инструкцию для учеников
            a.openIns(href="./Auth/BroshureFinal.pdf")
              p.openIns Скачать инструкцию для учителей

          .auth-space
          .auth-form
            span.ui-title-2
              strong Регистрация
            form(@submit.prevent="onSubmit")

              .form-item(:class="{ 'errorInput': $v.name.$error }")
                input(
                  type="text"
                  placeholder="Имя пользователя"
                  v-model="name"
                  :class="{ 'error': $v.name.$error }"
                  @change="$v.name.$touch()"
                )
                .error(v-if="!$v.name.required") Это поле обязательно
                .error(v-if="!$v.name.maxLength") Максимальная длина имени - {{ $v.name.$params.maxLength.max }} символов

              .form-item(:class="{ 'errorInput': $v.email.$error }")
                input(
                  type="email"
                  placeholder="Почта"
                  v-model="email"
                  :class="{ 'error': $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Это поле обязательно
                .error(v-if="!$v.email.email") Неверный формат Email

              .form-item(:class="{ 'errorInput': $v.password.$error }")
                input(
                  type="password"
                  placeholder="Пароль"
                  v-model="password"
                  :class="{ 'error': $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Это поле обязательно
                .error(v-if="!$v.password.minLength") Минимальная длина пароля - {{ $v.password.$params.minLength.min }} символов

              .form-item(:class="{ 'errorInput': $v.repeatPassword.$error }")
                input(
                  type="password"
                  placeholder="Повторите пароль"
                  v-model="repeatPassword"
                  :class="{ 'error': $v.repeatPassword.$error }"
                  @change="$v.repeatPassword.$touch()"
                )
                .error(v-if="!$v.repeatPassword.required") Это поле обязательно
                .error(v-if="!$v.repeatPassword.sameAsPassword") Пароли не совпадают
              .buttons-list
                button.button-registr.button.button-primary(
                  type="submit"
                )
                  span(v-if="loading") Загрузка...
                  span(v-else) Зарегистрироваться

              //- .buttons-list.buttons-list-agreement
                //- p
                //-   | Регистрируя аккаунт вы соглашаетесь с
                //-   a(href='http://ledokolpro.tilda.ws/policy')  Политикой Кофеденциальности
                //-   |  и
                //-   a(href='http://ledokolpro.tilda.ws/rulesy')  Условиями пользования

              .buttons-list.buttons-list-info
                p.errorMsg(v-if="submitStatus === 'OK'") Успешно зарегистрирован
                p.errorMsg.error(v-else-if="submitStatus === 'The email address is already in use by another account.'") Данный email адрес уже используется.
                p.errorMsg.error(v-else-if="submitStatus === 'ERROR'") Пожалуйста, проверьте правильность заполнения полей
                p.errorMsg.error(v-else) {{submitStatus}}

              .buttons-list-reference
                span Уже есть аккаунт?
                  router-link(style="color: #763DCA" to='/login')  Войдите
    .successMenu(v-if = 'submitStatus === "Validation Pending"')
      md-dialog(:md-active.sync='showEmailVerified')
        md-dialog-title Подтвердите, пожалуйста, вашу почту
        span.md-headline(style="margin:20px;") Вам на почту было отправлено письмо,<br> перейдите по ссылке в этом письме
        md-dialog-actions
          md-button.md-primary(@click = '$router.push("/login")') Подтвердил

      //- .successMenuBox
      //-   .successText
      //-     strong.md-title.titleTokenText.md-display-3 Готово!
      //-     br
      //-     span.titleTokenText.md-display-1 Осталось только подтвердить ваш аккаунт
      //-     .successGoButton
      //-       .md-button.md-raised.successButton(@click = '$router.push("/login")') Сделано
</template>

<script>
import { required, email, minLength, sameAs, maxLength } from 'vuelidate/lib/validators'
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      showEmailVerified: false,
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(25)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    loading () {
      return this.$store.state.common.loading
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.submitStatus = 'OK'
            this.registerUserInDatabase(this.name, user)
            this.submitStatus = 'Validation Pending'
            this.showEmailVerified = true
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    },
    registerUserInDatabase (name, user) {
      const db = firebase.firestore()

      var achivmentCount = 8
      var taskCount = 0
      var tasksDb = db.collection('tasks').doc('ОГЭ Вариант 1')
      tasksDb.get()
        .then(doc => {
          taskCount = doc.data().items
          var achievements = []
          for (let i = 0; i < achivmentCount; i++) {
            achievements.push(0)
          }

          var tasks = []
          for (let i = 0; i < taskCount; i++) {
            tasks.push(1)
          }

          var data = {
            name: this.name,
            password: this.password,
            bookmark: [],
            like: [],
            submit: 0,
            right: 0,
            email: this.email,
            money: 100,
            'game score': 0,
            achiv: achievements,
            lastTheme: 'ОГЭ Вариант 1',
            'ОГЭ Вариант 1': tasks,
            'ОГЭ Вариант 1Solution': tasks
          }

          db.collection('account').doc(this.$store.getters.getPreId).set(data)
          // this.$router.push('/main')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content-wrapper
    min-height 0
  .successText
    padding 10%
    text-color #000000 !important
  .successGoButton
    padding 5%
    padding-bottom 0
  .successMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .successButton
    width 20%
    height 20%

  .successMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px

  .navbar
    display none
  .auth
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex

  .openIns
    position relative
    margin 8px
  .auth-form
    position relative
    width 47%
    height auto
    min-width 220px
    display inline-block
    box-shadow 0 0 2px 0px rgba(0,0,0,0.5)
    border-radius 10px
    padding-left 20px
    padding-right 20px

  .auth-title
    position relative
    margin-right 6%
    margin-bottom 20px
    width 47%
    min-width 200px
    display inline-block
    box-shadow 0 0 2px 0px rgba(0,0,0,0.5)
    border-radius 10px
    text-align center

  .picture
    width 40%
  .auth-space
    width 4%

  .form-item
    input
      font-size 1em
    .error
      display none
      margin-bottom 2%
      font-size 1em
      color #fc5c65
    &.errorInput
      .error
        display block

  .buttons-list
    text-align right
    width auto
    margin 3%
    margin-right 0
    margin-bottom 5%
    &:last-child
      margin-bottom 0

  input
    border-radius 5px
    border-width 1px
    border-color #763dca
    &.error
      border-color #fc5c65

.buttons-list-reference
  text-decoration none
  color #525252
  text-align center
  margin-bottom 15px

.button-registr
    border-radius 10px
    background-color #763DCA
    width auto
    font-family 'Roboto', sans-serif
    font-size 1.1em
    padding 11px
    font-weight 500

  .error
    color #fc5c65

  .ui-title-2
    color #763DCA
    font-family sans-serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    // font-family 'Roboto', sans-serif
    font-size 23pt
    margin-top 20px
    font-weight bold

  @media screen and (max-width:500px)
    .auth-title
        display none
    .auth-space
      width 0%
    .auth-form
      width 100%

</style>
