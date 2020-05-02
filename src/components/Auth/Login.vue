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
                ) Вход
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
        console.log(user)
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
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

* {box-sizing: border-box}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  background-color: #763DCA;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity:1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}

#register{
  background-color: #f1f1f1;
  text-color :#FFFFFF;
  width :10px;
}

</style>
