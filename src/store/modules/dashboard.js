import { companyList, companyEdit, companyRecord, bindCard, unBindCard } from '@/api/dashboard'

const dashboard = {
  state: {
    companyData: {},
    tradList: []
  },
  mutations: {

  },
  actions: {
    getCompanyList({ commit }) {
      return new Promise((resolve, reject) => {
        companyList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCompanyRecord({ commit }, values) {
      return new Promise((resolve, reject) => {
        companyRecord(values).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    companyEdit({ commit }) {
      return new Promise((resolve, reject) => {
        companyEdit().then(response => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bindCard({ commit }, values) {
      return new Promise((resolve, reject) => {
        bindCard(values).then(response => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    unBindCard({ commit }, values) {
      return new Promise((resolve, reject) => {
        unBindCard(values).then(response => {
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default dashboard
