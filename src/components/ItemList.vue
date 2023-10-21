<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">To Do List</h1>
    <form @submit.prevent="addTodo" class="mb-4 flex flex-col sm:flex-row gap-6">
      <input type="text" v-model="newTodo" placeholder="Enter a new task" required class="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Add Task</button>
    </form>
    <ul>
      <li v-for="todo in pendingTodos" :key="todo.id" class="flex items-center mb-2">
        <input type="checkbox" v-model="todo.completed" class="mr-2">
        <span :class="{ 'completed': todo.completed }" class="text-lg flex-grow font-semibold mr-2 text-blue-600 capitalize">{{ todo.title }}</span>
        <input type="date" v-model="todo.dueDate" class="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
        <button @click="duplicateTask(todo)" class="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2">Duplicate</button>
        <button @click="deleteTask(todo.id)" class="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 ml-2">Delete</button>
      </li>
    </ul>
    <h2 class="text-xl font-bold mt-4">Completed Tasks</h2>
    <ul>
      <li v-for="todo in completedTodos" :key="todo.id" class="mb-2">
        <input type="checkbox" v-model="todo.completed" disabled class="mr-2">
        <span class="line-through text-lg capitalize font-semibold text-red-800">{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>



<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'


export default {
  computed: {
    ...mapGetters(['pendingTodos', 'completedTodos'])
  },
  methods: {
    ...mapMutations(['addTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete']),
    ...mapActions(['addNewTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete']),
    addTodo() {
      const newTodo = {
        id: Date.now(),
        title: this.newTodo,
        completed: false,
        dueDate: null
      }
      this.addNewTodo(newTodo)
      this.newTodo = ''
    },
    deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.deleteTodo(id)
      }
    },
    duplicateTask(todo) {
      const newTodo = { ...todo, id: Date.now(),title: todo.title, dueDate: todo.dueDate}
      this.addNewTodo(newTodo)
    }
  },
  data() {
    return {
      newTodo: ''
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
