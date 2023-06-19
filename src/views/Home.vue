<template>
  <div class="home">

    <a v-if="!user.isLogin">未登录,请登录</a>
    <h1 v-else>已经登录啦！！！</h1>
  </div>
</template>


<script>
export default {
  name: 'Home'
}
</script>
<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useUser } from '@/store/user'
const user = useUser();


</script>
