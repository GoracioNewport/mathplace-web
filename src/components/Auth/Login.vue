<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth-title
            h1.ui-title-2 Пикча
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
              .buttons-list
                button.button.button-primary(
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
                span Нет аккаунта?
                  router-link(to='/registration')  Создайте его!
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
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
        this.$store.dispatch('loginUser', user)
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

  .error
    color #fc5c65

</style>
