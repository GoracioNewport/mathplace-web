<template lang="html">
  <form action="action_page.php">
  <div class="container">
    <h1 id="registr">Регистрация</h1>
    <p>Создайте свой аккаунт</p>
    <hr>
    <label for="psw-repeat"><b>Введите имя</b></label>
    <input type="password" placeholder="Повторите пароль" name="psw-repeat" required>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Введиет email" name="email" required>

    <label for="psw"><b>Пароль</b></label>
    <input type="password" placeholder="Введите пароль" name="psw" required>

    <hr>

    <p>Регистрируя аккаунт вы соглашаетесь с <a href="http://ledokolpro.tilda.ws/policy">Политикой Кофеденциальности</a> и <a href="http://ledokolpro.tilda.ws/rules">Условиями пользования</a></p>
    <button type="submit" class="registerbtn">Зарегистрироваться</button>
  </div>

  <div class="container signin">
    <p>Уже есть аккаунт <router-link to="/login">Войти</router-link>.</p>
  </div>
</form>
  <!-- .content-wrapper
    section
      .container
        h1.ui-title-1 Registration -->
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
// const app = new Vue({
//     el: '#app',
//     data: {
//       message: 'Hello Vue!',
//       now: new Date()
//     },
//     methods: {
//       updateDate() {
//         this.now = new Date();
//       }
//     },
//     mounted() {
//       setInterval(() => {
//         this.updateDate();
//       }, 1000);
//     }
//   })
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
