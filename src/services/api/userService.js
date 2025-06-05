import userData from '../mockData/user.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let users = [...userData]

export const userService = {
  async getAll() {
    await delay(300)
    return [...users]
  },

  async getById(id) {
    await delay(250)
    const user = users.find(u => u.id === id || u.id === id.toString())
    if (!user) throw new Error('User not found')
    return { ...user }
  },

  async create(userData) {
    await delay(400)
    const newUser = {
      ...userData,
      id: Date.now().toString()
    }
    users = [...users, newUser]
    return { ...newUser }
  },

  async update(id, userData) {
    await delay(350)
    const index = users.findIndex(u => u.id === id || u.id === id.toString())
    if (index === -1) throw new Error('User not found')
    
    users[index] = { ...users[index], ...userData }
    return { ...users[index] }
  },

  async delete(id) {
    await delay(300)
    const index = users.findIndex(u => u.id === id || u.id === id.toString())
    if (index === -1) throw new Error('User not found')
    
    const deletedUser = users[index]
    users = users.filter(u => u.id !== id && u.id !== id.toString())
    return { ...deletedUser }
  }
}