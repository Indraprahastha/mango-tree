"use strict"
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var exp = express();
exp.use(bodyParser.json())
exp.use(bodyParser.urlencoded({ extended: false }))
exp.use(cors())

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
var db = firebase.database();

class MangoTree {
  constructor(data) {
    this._age = data.data.umur
    this._height = data.data.tinggi
    this._maxAge = 20
    this._healthyStatus = true
    this._fruts = []
    this._harvested = 0
    this._frutsStatusGood = 0
    this._frutsStatusBad = 0
    this._batascount = 0
    this._count = 0
    this._id = data.id
  }

  getBatascount() {
    this._batascount = Math.floor(Math.random() * 5)
  }
  getCount(){
    this._count++
  }
  getAge() {
    return this._age
  }
  getHeight() {
    return this._height
  }
  getFruits() {
    return this._fruts
  }
  getHealtyStatus() {
    return this._healthyStatus
  }

  grow() {
    if(this._age < this._maxAge){
      this._age++
      this._height += Math.floor(Math.random() * 3)
    }
    else if (this._age == this._maxAge) {
      this._healthyStatus = false
    }
  }

  produceMangoes() {
    this._fruts = []
    let random = Math.floor(Math.random() * 10)
    for (var i = 0; i < random; i++) {
      this._fruts.push(new Mango())
    }
  }

  harvest() {
    this._frutsStatusGood = 0
    this._frutsStatusBad = 0
    this._harvested = this._fruts.length

    for (var i = 0; i < this._fruts.length; i++) {
      if(this._fruts[i].setatusBuah=='good'){
        this._frutsStatusGood+=1
      }
      else {
        this._frutsStatusBad+=1
      }
    }
  }

}

class Mango {
  constructor() {
    this.setatusBuah = this.random()
  }

  random() {
    let quality = ['good','bad']
    let random = Math.floor(Math.random() * 2)
    return quality[random]
  }
}

exp.post('/', (req,res) => {
  let mangoTree = new MangoTree(req.body)
  mangoTree.getBatascount();
  mangoTree._id = req.body.key
  mangoTree.age = req.body.data.umur
  mangoTree._height = req.body.data.tinggi
  mangoTree._harvested = req.body.data.jumlahbuah
  mangoTree._frutsStatusGood = req.body.data.buahterbaik
  mangoTree._frutsStatusBad = req.body.data.buahburuk


  let task = cron.schedule('* * * * * *', function(){
    // if (mangoTree._healthyStatus != false) {
      if (mangoTree._count <= mangoTree._batascount) {
        mangoTree.grow()
        mangoTree.produceMangoes()
        mangoTree.harvest()

        mangoTree.getCount();

        console.log(mangoTree._count)
        console.log(mangoTree._batascount)

        firebase.database().ref('manggotree/' + req.body.key).set({
          umur: mangoTree._age,
          tinggi: mangoTree._height,
          jumlahbuah: mangoTree._harvested,
          buahterbaik: mangoTree._frutsStatusGood,
          buahburuk: mangoTree._frutsStatusBad
        })
      }
      else {
        res.send(
          'Clear'
      )
        task.stop()
        console.log('selesai atas')
      }
  })
})

exp.listen(3000,()=>{
  console.log('Running');
})
