<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth-title
            h1.ui-title-2 Пикча
          .auth-form
            span.ui-title-2 Регистрация
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

              .buttons-list.buttons-list-agreement
                p
                  | Регистрируя аккаунт вы соглашаетесь с
                  a(href='http://ledokolpro.tilda.ws/policy')  Политикой Кофеденциальности
                  |  и
                  a(href='http://ledokolpro.tilda.ws/rulesy')  Условиями пользования

              .buttons-list.buttons-list-info
                p.errorMsg(v-if="submitStatus === 'OK'") Успешно зарегистрирован
                p.errorMsg(v-if="submitStatus === 'ERROR'") Пожалуйста, проверьте правильность заполнения полей
                p.errorMsg(v-else) {{submitStatus}}

              .buttons-list-reference
                span Уже есть аккаунт?
                  router-link(to='/login')  Войдите
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
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
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
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
            this.$router.push('/')
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
  .auth
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex

  .auth-title,
  .auth-form
    width 50%

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
    border-color #000
    &.error
      border-color #fc5c65

  .buttons-list-reference
    text-align center

</style>
