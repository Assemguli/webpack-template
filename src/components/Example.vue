<template>
  <section id="main">
    <div class="container">
      <h1> Webpack message: {{ message }} </h1>
      <!-- <img src="/assets/img/logo.png" :alt="message" />
      <p>{{ message }}</p> -->
    </div>
  </section>
</template>

<script>
// Жду на курсе по вью: https://tocode.ru/curses/vuejs-s-nylya-do-pro
// Скидка по промокоду: "WEBPACK" ;)
export default {
  data() {
    return {
      message: null,
    }
  },
created () {
    this.message = this.$store.getters.getMessage
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color:greenyellow;
}
// .container {
//   text-align: center;
// }
// img {
//   max-width: 200px;
// }
</style>
