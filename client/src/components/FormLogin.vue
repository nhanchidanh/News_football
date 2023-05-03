<script setup>
import { ref } from "vue";
import authApi from "../api/authApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);
const emailRules = [(v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ"];

const store = useStore();
const router = useRouter();

function handleSubmit() {
  return new Promise(async (resolve, reject) => {
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await authApi.signIn(data);
      if (response.elements) {
        store.dispatch("toast/startToast", {
          text: "Đăng nhập thành công",
          color: "success",
          open: true,
        });

        // * Lưu accessToken vào store
        store.dispatch("auth/saveAccessToken", response.elements.accessToken);

        // * Chuyển hướng tới trang dashboard
        router.push("/manager/dashboard");
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
      )
        errorMessage.value = error.response.data.errors.message;
      reject(error);
    }
  });
}
</script>

<template>
  <v-row justify="center" align="center" style="min-height: 80vh">
    <v-col cols="6" align-self="center">
      <v-sheet class="pa-2 ma-2">
        <v-form @submit.prevent="handleSubmit">
          <h1 class="mb-5 text-center">ĐĂNG NHẬP</h1>

          <v-alert class="mb-5" type="error" v-if="errorMessage">{{
            errorMessage
          }}</v-alert>

          <v-text-field v-model="email" label="E-mail" :rules="emailRules" />

          <v-text-field v-model="password" type="password" label="Mật khẩu" />

          <router-link class="text-decoration-none" to="/password/forgot">
            Quên mật khẩu
          </router-link>
          |
          <router-link class="text-decoration-none" to="/register">
            Tạo tài khoản mới
          </router-link>

          <v-btn
            block
            type="submit"
            :disabled="!email || !password"
            color="primary"
            class="mt-5 d-block"
          >
            Đăng nhập
          </v-btn>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>
