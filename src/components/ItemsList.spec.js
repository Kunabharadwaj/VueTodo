import { mount } from '@vue/test-utils';
import ItemList from './ItemList.vue';

describe('ItemList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ItemList)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('adds a new task when the form is submitted', async () => {
    const input = wrapper.find('input[type="text"]')
    const button = wrapper.find('button[type="submit"]')

    input.setValue('New Task')
    await button.trigger('click')

    expect(wrapper.vm.pendingTodos).toHaveLength(1)
    expect(wrapper.vm.pendingTodos[0].title).toBe('New Task')
  })

  it('deletes a task when the delete button is clicked', async () => {
    const todo = {
      id: 1,
      title: 'Task 1',
      completed: false,
      dueDate: null
    }

    wrapper.setData({
      pendingTodos: [todo]
    })

    const deleteButton = wrapper.find('.bg-red-500')

    await deleteButton.trigger('click')

    expect(wrapper.vm.pendingTodos).toHaveLength(0)
  })

  it('duplicates a task when the duplicate button is clicked', async () => {
    const todo = {
      id: 1,
      title: 'Task 1',
      completed: false,
      dueDate: null
    }

    wrapper.setData({
      pendingTodos: [todo]
    })

    const duplicateButton = wrapper.find('.bg-yellow-500')

    await duplicateButton.trigger('click')

    expect(wrapper.vm.pendingTodos).toHaveLength(2)
    expect(wrapper.vm.pendingTodos[1].title).toBe('Task 1')
  })
})
