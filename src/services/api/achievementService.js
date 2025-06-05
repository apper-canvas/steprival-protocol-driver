import achievementData from '../mockData/achievement.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let achievements = [...achievementData]

export const achievementService = {
  async getAll() {
    await delay(280)
    return [...achievements]
  },

  async getById(id) {
    await delay(250)
    const achievement = achievements.find(a => a.id === id || a.id === id.toString())
    if (!achievement) throw new Error('Achievement not found')
    return { ...achievement }
  },

  async create(achievementData) {
    await delay(400)
    const newAchievement = {
      ...achievementData,
      id: Date.now().toString()
    }
    achievements = [...achievements, newAchievement]
    return { ...newAchievement }
  },

  async update(id, achievementData) {
    await delay(350)
    const index = achievements.findIndex(a => a.id === id || a.id === id.toString())
    if (index === -1) throw new Error('Achievement not found')
    
    achievements[index] = { ...achievements[index], ...achievementData }
    return { ...achievements[index] }
  },

  async delete(id) {
    await delay(300)
    const index = achievements.findIndex(a => a.id === id || a.id === id.toString())
    if (index === -1) throw new Error('Achievement not found')
    
    const deletedAchievement = achievements[index]
    achievements = achievements.filter(a => a.id !== id && a.id !== id.toString())
    return { ...deletedAchievement }
  }
}