import Vue from 'vue'
import Vuex from 'vuex'
// hapus
import VueFire from 'vuefire'
import firebase from 'firebase'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(VueFire)
Vue.use(Vuex)

var config = {
  apiKey: 'AIzaSyCfUDFkgzFt_Nzq7hJjX_DQmQE5KuNXw3g',
  authDomain: 'websocket-slide-ba8fd.firebaseapp.com',
  databaseURL: 'https://websocket-slide-ba8fd.firebaseio.com',
  projectId: 'websocket-slide-ba8fd',
  storageBucket: 'websocket-slide-ba8fd.appspot.com',
  messagingSenderId: '258066709342'
}

firebase.initializeApp(config)
Vue.prototype.$db = firebase.database()

const state = {
  pohonManggah: [],
  semuadata: [],
  statussiram: false
}

const mutations = {
  addPengguna (state, payload) {
    state.pemain = payload
  },
  ambilData (state, payload) {
    state.semuadata = payload
  }
}

const actions = {
  addManggo ({commit}) {
    console.log('jalankan')
    Vue.prototype.$db.ref('manggotree').push({
      umur: 0,
      tinggi: 0,
      jumlahbuah: 0,
      buahterbaik: 0,
      buahburuk: 0

    })
    .then((data) => {
    })
  },
  getPohon ({commit}) {
    const ref = firebase.database().ref('manggotree')
    ref.on('value', (snap) => {
      commit('ambilData', snap.val())
    })
  },
  getSatuPohon ({commit}, data) {
    state.statussiram = !state.statussiram
    console.log('budi', data)
    http.post('/', data)
      .then(({data}) => {
        state.statussiram = !state.statussiram
        console.log(data)
      }
    )
  },
  deletePohon ({commit}, data) {
    Vue.prototype.$db.ref('manggotree/' + data).remove()
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
