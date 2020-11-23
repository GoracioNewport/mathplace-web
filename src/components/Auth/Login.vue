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
              strong Инструкция
            a.openIns(class=".openIns" href="https://play.google.com/store/apps/details?id=com.math4.user.mathplace")
              p Скачать инструкцию для учеников
            a.openIns(href="https://play.google.com/store/apps/details?id=com.math4.user.mathplace")
              p.openIns Скачать инструкцию для учителей

          .auth-form
            span.ui-title-2 Вход
            form(@submit.prevent="onSubmit")
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
              .form-item.stayInCheckbox
                md-checkbox(v-model = 'staySigned') Запомнить меня
              .buttons-list
                button.button-login.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                )
                  span(v-if="loading") Загрузка...
                  span(v-else) Войти

              .buttons-list.buttons-list-info
                p.errorMsg(v-if="submitStatus === 'OK'") Успешно вошли
                p.errorMsg.error(v-else-if="submitStatus === 'There is no user record corresponding to this identifier. The user may have been deleted.'") Неверный логин или пароль
                p.errorMsg.error(v-else-if="submitStatus === 'The password is invalid or the user does not have a password.'") Неверный логин или пароль
                p.errorMsg.error(v-else-if="submitStatus === 'ERROR'") Пожалуйста, проверьте правильность заполнения полей
                p.errorMsg.error(v-else) {{submitStatus}}
              .buttons-list-reference
                p Нет аккаунта?
                  router-link(style="color: #763DCA" to='/registration')    Создайте его!
    div(v-if = 'submitStatus === "Validation Required"')
      md-dialog(:md-active.sync='showDialog')
        md-dialog-title Ваш аккаунт не подтвержден
        .successText
          span.md-headline Пожалуйста, перейдите по ссылке, которую мы прислали вам на почту
        md-dialog-actions
          md-button.md-primary(@click ='sendEmailConfirmationMessage, submitStatus = null') Отправить письмо повторно
          md-button.md-primary(@click ='submitStatus = null') Окей

      //- .successMenuBox
      //-   .successText
      //-     strong.md-title.titleTokenText.md-display-3 Внимание!
      //-     br
      //-     span.titleTokenText.md-display-1 Ваш аккаунт не подтвержден
      //-     br
      //-     span.titleTokenText.md-display-1 Пожалуйста, перейдите по ссылке, которую мы прислали вам на почту
      //-     .successGoButton
      //-       .md-button.md-raised.successButton(@click = 'sendEmailConfirmationMessage') Отправить письмо повторно
      //-       .md-button.md-raised.successButton(@click ='submitStatus = null') Сделано
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      showDialog: false,
      staySigned: false,
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    loading () {
      return this.$store.state.common.loading
    }
  },
  methods: {
    ...mapActions(['sendEmailConfirmationMessage']),
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password,
          remember: this.staySigned
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.submitStatus = this.$store.getters.getErrors
            if (this.submitStatus === 'Validation Required') {
              this.showDialog = true
            }
            if (this.submitStatus === null) this.$router.push(this.$route.query.redirect || '/main')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-wrapper
    min-height 0
.stayInCheckbox
  float left
  margin 10px
  font-size 22pt
.successText
    padding 20px
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

.auth
  position relative
  width 100%
  font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  margin-left 0px

.auth-form
  position relative
  width 45%
  height auto
  min-width 300px
  float right
  // display inline-block
  box-shadow 0 0 3px 0px rgba(0,0,0,0.5)
  border-radius 10px
  padding-left 20px
  margin-bottom 30px
  margin-top 0px
  top 0px
  padding-right 20px
  @media screen and (max-width:775px)
    width 90%
    margin-left 0%
    float left

.openIns
  font-size 12pt
  margin 8px
  @media screen and (max-width:400px)
    margin 2px

.auth-title
  position relative
  // margin-right 6%
  width 45%
  height auto
  min-width 300px
  float left
  // display inline-block
  box-shadow 0 0 3px 0px rgba(0,0,0,0.5)
  border-radius 10px
  margin-bottom 30px
  margin-top 0px
  text-align center
  @media screen and (max-width:775px)
    width 90%
    margin-left 0%

.textTop
  position relative
  margin-top 10px
.picture
  position relative
  margin-top 10px
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
  margin 3%
  margin-right 0
  margin-bottom 5%
  margin-left 5%
  &:last-child
    margin-bottom 0

input
  border-radius 5px
  border-width 1px
  border-color #763DCA
  &.error
    border-color #fc5c65

.button-login
  border-radius 10px
  background-color #763DCA
  width auto
  font-family 'Roboto', sans-serif
  font-size 1.1em
  padding 11px
  font-weight 500

.ui-title-2
  color #763DCA
  font-family sans-serif, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  // font-family 'Roboto', sans-serif
  font-size 23pt
  margin-top 20px
  font-weight bold

.buttons-list-reference
  color #525252
  width 100%
  margin-bottom 10px
  text-align center
  p
    position relative
    width 100%
  @media screen and (max-width:400px)
    font-size 5pt

.error
  color #fc5c65

</style>
