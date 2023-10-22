// Import Vue and Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// Tell Vue to use Vuex
Vue.use(Vuex)

// Export a new Vuex store
export default new Vuex.Store({
  // The state object is where you define the data for your application
  state: {
    todos: [] // An array to hold our todos
  },
  // Mutations are functions that directly change the state
  mutations: {
    // Add a new todo to the todos array
    addTodo: (state, todo) => state.todos.push(todo),
    // Update a todo in the todos array
    updateTodo: (state, { id, updatedTodo }) => {
      const index = state.todos.findIndex(todo => todo.id === id) // Find the index of the todo with the given id
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo) // Replace the todo at the found index with the updated todo
      }
    },
    // Delete a todo from the todos array
    deleteTodo: (state, id) => {
      const index = state.todos.findIndex(todo => todo.id === id) // Find the index of the todo with the given id
      if (index !== -1) {
        state.todos.splice(index, 1) // Remove the todo at the found index
      }
    },
    // Mark a todo as complete
    markTodoComplete: (state, id) => {
      const todo = state.todos.find(todo => todo.id === id) // Find the todo with the given id
      if (todo) {
        todo.completed = true // Mark the found todo as complete
      }
    }
  },
  // Actions are functions that commit mutations
  actions: {
    // Add a new todo
    addNewTodo: ({ commit }, todo) => {
      commit('addTodo', todo) // Commit the addTodo mutation with the given todo
    },
    // Update a todo
    updateTodo: ({ commit }, { id, updatedTodo }) => {
      commit('updateTodo', { id, updatedTodo }) // Commit the updateTodo mutation with the given id and updated todo
    },
    // Delete a todo
    deleteTodo: ({ commit }, id) => {
      commit('deleteTodo', id) // Commit the deleteTodo mutation with the given id
    },
    // Mark a todo as complete
    markTodoComplete: ({ commit }, id) => {
      commit('markTodoComplete', id) // Commit the markTodoComplete mutation with the given id
    }
  },
  // Getters are functions that return some state
  getters: {
    // Return only the todos that are not complete
    pendingTodos: state => state.todos.filter(todo => !todo.completed),
    // Return only the todos that are complete
    completedTodos: state => state.todos.filter(todo => todo.completed)
  }
})
