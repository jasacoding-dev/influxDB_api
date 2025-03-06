<template>
  <div id="app">
    <BucketList />
    <BucketForm />
  </div>
</template>

<script>
import BucketList from './components/BucketList.vue';

export default {
  components: {
    BucketList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>