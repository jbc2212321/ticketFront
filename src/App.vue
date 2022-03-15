<template>
  <div id="app">
<!--   <p>根目录</p>-->
      <keep-alive>
          <!-- 需要缓存的视图组件 -->
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <router-view/>
  </div>
</template>

<style>

</style>
