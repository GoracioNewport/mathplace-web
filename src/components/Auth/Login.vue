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
                  router-link(style="color: #763DCA" to='/registration')  Создайте его!
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

.auth-form
  width 56%
  box-shadow 0 0 10px rgba(0,0,0,0.5)
  border-radius 10px
  padding 10px
  margin-left 50px

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
  margin-left 5%
  &:last-child
    margin-bottom 0

input
  border-radius 5px
  border-width 1px
  border-color #763DCA
  &.error
    border-color #fc5c65

button
  border-radius 10px
  background-color #763DCA
  width auto
  font-family 'Roboto', sans-serif
  font-size 1.1em
  padding 11px
  font-weight 500

.ui-title-2
  color #763DCA
  font-family 'Roboto', sans-serif
  font-size 2.4em
  font-weight bold

.buttons-list-reference
  text-decoration none
  color #525252
  text-align center

@media screen and (max-width:500px)
  .auth-title
      display none
  .auth-form
    width 100%
  .auth-space
    width 0%
.error
  color #fc5c65

</style>
