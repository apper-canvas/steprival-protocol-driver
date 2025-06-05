import challengeData from '../mockData/challenge.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let challenges = [...challengeData]

export const challengeService = {
  async getAll() {
    await delay(300)
    return [...challenges]
  },

  async getById(id) {
    await delay(250)
    const challenge = challenges.find(c => c.id === id || c.id === id.toString())
    if (!challenge) throw new Error('Challenge not found')
    return { ...challenge }
  },

  async create(challengeData) {
    await delay(450)
    const newChallenge = {
      ...challengeData,
      id: Date.now().toString()
    }
    challenges = [...challenges, newChallenge]
    return { ...newChallenge }
  },

  async update(id, challengeData) {
    await delay(350)
    const index = challenges.findIndex(c => c.id === id || c.id === id.toString())
    if (index === -1) throw new Error('Challenge not found')
    
    challenges[index] = { ...challenges[index], ...challengeData }
    return { ...challenges[index] }
  },

  async delete(id) {
    await delay(300)
    const index = challenges.findIndex(c => c.id === id || c.id === id.toString())
    if (index === -1) throw new Error('Challenge not found')
    
    const deletedChallenge = challenges[index]
    challenges = challenges.filter(c => c.id !== id && c.id !== id.toString())
    return { ...deletedChallenge }
  }
}