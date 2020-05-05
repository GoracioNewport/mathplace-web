<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth-title
            span.ui-title-2
              strong Наше приложение
            //img(class="picture", src='@/assets/saluting.png', alt='Пикча')
            //img(class="picture", src='@/assets/gestures.png', alt='Пикча')
            //img(class="picture", src='@/assets/birthday-and-party.png', alt='Пикча')
            //img(class="picture", src='@/assets/miscellaneous.png', alt='Пикча')
            a(href="https://play.google.com/store/apps/details?id=com.math4.user.mathplace")
              //img(class="picture", src='@/assets/google_play.svg', alt='Пикча')
              img(class="picture", src='@/assets/googleplay.png', alt='Пикча')
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
                button.button.button-primary(
                  type="submit"
                )
                  span(v-if="loading") Загрузка...
                  span(v-else) Зарегистрироватся

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
                  router-link(to='/login')  Войдите
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
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.submitStatus = 'OK'
            this.registerUserInDatabase(this.name, user)
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    },
    registerUserInDatabase (name, user) {
      const db = firebase.firestore()
      db.collection('account').document(user.getUid())
    }
  }
}
</script>

<style lang="stylus" scoped>
  .auth
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex

  // .auth-title,
  .auth-form
    width 56%
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px
    padding 10px

  .auth-title
    width 40%
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px
    padding 10px
    text-align center
  .picture
    width 80%
  .auth-space
    width 4%

  .form-item
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
    &:last-child
      margin-bottom 0

  input
    border-radius 5px
    border-width 1px
    border-color #763dca
    &.error
      border-color #fc5c65

  .buttons-list-reference
    text-align center
    color #763DCA
  button
    border-radius 10px
    background-color #763DCA
    width 40%

  .error
    color #fc5c65

  .ui-title-2
    color #763DCA

  @media screen and (max-width:500px)
    .auth-title
        display none
    .auth-space
      width 0%
    .auth-form
      width 100%

</style>
