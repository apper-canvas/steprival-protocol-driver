import dailyStatsData from '../mockData/dailyStats.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let dailyStats = [...dailyStatsData]

export const dailyStatsService = {
  async getAll() {
    await delay(200)
    return [...dailyStats]
  },

  async getById(id) {
    await delay(250)
    const stats = dailyStats.find(s => s.id === id || s.id === id.toString())
    if (!stats) throw new Error('Daily stats not found')
    return { ...stats }
  },

  async create(statsData) {
    await delay(400)
    const newStats = {
      ...statsData,
      id: Date.now().toString()
    }
    dailyStats = [...dailyStats, newStats]
    return { ...newStats }
  },

  async update(id, statsData) {
    await delay(300)
    const index = dailyStats.findIndex(s => s.id === id || s.id === id.toString())
    if (index === -1) throw new Error('Daily stats not found')
    
    dailyStats[index] = { ...dailyStats[index], ...statsData }
    return { ...dailyStats[index] }
  },

  async delete(id) {
    await delay(300)
    const index = dailyStats.findIndex(s => s.id === id || s.id === id.toString())
    if (index === -1) throw new Error('Daily stats not found')
    
    const deletedStats = dailyStats[index]
    dailyStats = dailyStats.filter(s => s.id !== id && s.id !== id.toString())
    return { ...deletedStats }
  }
}