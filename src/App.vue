<template>
  <div id="app">
    <h1 class="flex justify-center items-center text-3xl font-bold mb-4">My To-Do App</h1>
    <ItemList />
  </div>
</template>

<script>
import ItemList from './components/ItemList.vue';
import './assets/tailwind.css'

export default {
  name: 'App',
  components: {
    ItemList,
  },
};
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
