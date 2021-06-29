<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Login and Start Shopping !</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          append-icon="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="password"
          hint="At least 6 characters"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn color="accent lighten-1" :disable="!valid" @click="submit">
            Login
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      email: "alian@mail.com",
      emailRules: [
        v => !!v || "Email is required",
        v =>
          /([a-zA-Z0-9_]){1,}(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-0_]{2,})+/.test(
            v
          ) || "Email must be valid"
      ],
      showPassword: false,
      password: "",
      passwordRules: [
        v => !!v || "Password required",
        v => (v && v.length >= 6) || "Min 6 characters"
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setStatusDialog: "dialog/setStatus",
      setAuth: "auth/set"
    }),
    close() {
      this.setStatusDialog(false);
    },
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          email: this.email,
          password: this.password
        };
        this.axios
          .post("/login", formData)
          .then(response => {
            let data_user = response.data.data;
            this.setAuth(data_user);
            if (this.user.id > 0) {
              this.setAlert({
                status: true,
                text: "Login success",
                type: "success"
              });
              this.setStatusDialog(false);
            } else {
              this.setAlert({
                status: true,
                text: "Login error",
                type: "error"
              });
            }
          })
          .catch(error => {
            let responses = error.response;
            this.setAlert({
              status: true,
              text: responses.data.message,
              type: "error"
            });
          });
      }
    }
  }
};
</script>