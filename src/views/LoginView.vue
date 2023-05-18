<template>
  <div class="container">
    <h1>Login Page</h1>
    <form @submit="login">
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="form-control">
        <button type="submit" class="btn btn-block">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: '' as string,
      password: '' as string,
    };
  },
  methods: {
    login(event: Event): void {
      event.preventDefault();

      // Hardcoded validation
      if (this.username === 'huigong' && this.password === 'islearningvue') {
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push(`/detail/${this.username}`);
      } else {
        alert('Invalid username or password');
      }
    },
  },
};
</script>

<style></style>
