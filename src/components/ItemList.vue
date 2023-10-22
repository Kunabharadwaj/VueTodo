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
        <button @click="showDeleteModal(todo)" class="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 ml-2">Delete</button>
      </li>
    </ul>
    <h2 class="text-xl font-bold mt-4">Completed Tasks</h2>
    <ul>
      <li v-for="todo in completedTodos" :key="todo.id" class="mb-2">
        <input type="checkbox" v-model="todo.completed" disabled class="mr-2">
        <span class="line-through text-lg capitalize font-semibold text-red-800">{{ todo.title }}</span>
      </li>
    </ul>

    <!-- Delete Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Confirm Delete</h3>
        <p class="mb-4">Are you sure you want to delete this task?</p>
        <div class="flex justify-end">
          <button @click="deleteTask(todoToDelete.id)" class="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 mr-2">Delete</button>
          <button @click="closeDeleteModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  // Computed properties for the pending and completed todos
  computed: {
    // Use Vuex's mapGetters helper to map 'pendingTodos' and 'completedTodos' getters to local computed properties
    ...mapGetters(['pendingTodos', 'completedTodos'])
  },
  methods: {
    // Use Vuex's mapMutations helper to map 'addTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete' mutations to local methods
    ...mapMutations(['addTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete']),
    // Use Vuex's mapActions helper to map 'addNewTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete' actions to local methods
    ...mapActions(['addNewTodo', 'updateTodo', 'deleteTodo', 'markTodoComplete']),
    // Method to add a new todo
    addTodo() {
      // Create a new todo object
      const newTodo = {
        id: Date.now(), // Use the current timestamp as the id
        title: this.newTodo, // Use the newTodo data property as the title
        completed: false, // The todo is not completed initially
        dueDate: null // The due date is not set initially
      }
      // Dispatch the 'addNewTodo' action with the new todo
      this.addNewTodo(newTodo)
      // Clear the newTodo data property
      this.newTodo = ''
    },
    // Method to delete a task
    deleteTask(id) {
      // Dispatch the 'deleteTodo' action with the id of the task to delete
      this.deleteTodo(id)
      // Close the delete confirmation modal
      this.closeDeleteModal()
    },
    // Method to duplicate a task
    duplicateTask(todo) {
      // Create a new todo object that is a copy of the given todo, but with a new id
      const newTodo = { ...todo, id: Date.now(), title: todo.title, dueDate: todo.dueDate }
      // Dispatch the 'addNewTodo' action with the new todo
      this.addNewTodo(newTodo)
    },
    // Method to show the delete confirmation modal
    showDeleteModal(todo) {
      // Set the todoToDelete data property to the todo to delete
      this.todoToDelete = todo
      // Show the delete confirmation modal
      this.showDeleteConfirmation = true
    },
    // Method to close the delete confirmation modal
    closeDeleteModal() {
      // Clear the todoToDelete data property
      this.todoToDelete = null
      // Hide the delete confirmation modal
      this.showDeleteConfirmation = false
    }
  },
  // Data properties of the component
  data() {
    return {
      newTodo: '', // The title of the new todo to add
      showDeleteConfirmation: false, // Whether to show the delete confirmation modal
      todoToDelete: null // The todo to delete
    }
  }
}

</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
