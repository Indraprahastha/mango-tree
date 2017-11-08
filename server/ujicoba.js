var cron = require('node-cron');
var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: 'AIzaSyCfUDFkgzFt_Nzq7hJjX_DQmQE5KuNXw3g',
  authDomain: 'websocket-slide-ba8fd.firebaseapp.com',
  databaseURL: 'https://websocket-slide-ba8fd.firebaseio.com',
  projectId: 'websocket-slide-ba8fd',
  storageBucket: 'websocket-slide-ba8fd.appspot.com',
  messagingSenderId: '258066709342'
});
var database = firebase.database();
let count = 0

function start () {
  let mulai = cron.schedule('* * * * * *', function(){
    if (count<=5) {
      console.log(count)
      count++
    } else {
      // console.log('running a task every minute', count);
      // mulai.stop()
      mulai.stop()
    }
    // database.ref('ujicobalah/user/').push({
    //   username: 'tester',
    //   point: 100
    // })
    // .then((data) => {
    //   // commit('addPengguna', data)
    //   console.log('kembalian', data.key)
    // })
  })
}

start()
