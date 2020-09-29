<template>
  <v-row>
    <v-col
        cols="5"
        class="blue lighten-5 pa-0"
        :style="{
        height: '100vh',
      }"
    >
      <v-img
          class="d-flex align-center"
          height="100vh"
          src=@/assets/bg_img.jpg
      >
<!--        <v-img-->
<!--            height="200"-->
<!--            contain-->
<!--            class="auth_logo"-->
<!--            src=""-->
<!--        />-->
      </v-img>
    </v-col>
    <v-col
        class="grey lighten-3"
        :style="{
        height: '100vh',
      }"
    >
      <div
          class="d-flex align-center justify-center"
          :style="{
          height: '100%',
        }"
      >
        <router-view />
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
  .auth_logo {
    margin-top: -120px;
    position: relative;
    overflow: visible;
    &:after {
      content: "";
      position: absolute;
      width: 80px;
      height: 3px;
      bottom: -30px;
      border: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-color: #0a6350;
    }
  }
</style>
