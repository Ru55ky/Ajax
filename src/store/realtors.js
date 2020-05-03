import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

class Realtor {
  constructor (nameFirst, nameSecond, unit, imageSrc = '', guid = null, id = null, picker = null) {
    this.nameFirst = nameFirst
    this.nameSecond = nameSecond
    this.unit = unit
    this.imageSrc = imageSrc
    this.guid = guid
    this.id = id
    this.picker = picker
  }
}

export default {
  state: {
    realtors: []
  },
  mutations: {
    loadRealtors (state, payload) {
      state.realtors = payload
    },
    createRealtor (state, payload) {
      state.realtors.push(payload)
    },
    deleteRealtor (state, payload) {
      state.realtors = payload
    },
    updateRealtor (state, {nameFirst, nameSecond, id}) {
      const realtor = state.realtors.find(currentRealtor => {
        return currentRealtor.id === id
      })
      realtor.nameFirst = nameFirst
      realtor.nameSecond = nameSecond
    }
  },
  actions: {
    async createRealtor ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newRealtor = new Realtor(
          payload.nameFirst,
          payload.nameSecond,
          payload.unit,
          '',
          payload.guid,
          payload.id,
          payload.picker
        )
        const realtor = await fb.database().ref('realtors').push(newRealtor)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`realtors/${realtor.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

        await fb.database().ref('realtors').child(realtor.key).update({
          imageSrc
        })
        commit('setLoading', false)
        commit('createRealtor', {
          ...newRealtor,
          id: realtor.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchRealtor ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultRealtors = []
      try {
        const fbVal = await fb.database().ref('realtors').once('value')
        const realtors = fbVal.val()
        Object.keys(realtors).forEach(key => {
          const realtor = realtors[key]
          resultRealtors.push(
            new Realtor(
              realtor.nameFirst,
              realtor.nameSecond,
              realtor.unit,
              realtor.imageSrc,
              realtor.guid,
              key,
              realtor.picker)
          )
        })
        commit('loadRealtors', resultRealtors)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async deleteRealtor ({commit}, id) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('realtors').child(id).remove()
        commit('setLoading', false)
      } catch (error) {
        commit('clearError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateRealtor ({commit}, {nameFirst, nameSecond, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('realtors').child(id).update({
          nameFirst, nameSecond
        })
        commit('updateRealtor', {
          nameFirst, nameSecond, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    realtors (state) {
      return state.realtors
    },
    adById (state) {
      return adId => {
        return state.realtors.find(realtor => realtor.id === adId)
      }
    }
  }
}
