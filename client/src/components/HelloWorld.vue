<template>
  <div class="hello">

    <div class="col-sm-12">
      <div class="col-xs-6">
        <a v-on:click="tanamPohon" href="#" class="button">Tanam Pohon Anda! <i class="icon-chevron-right"></i></a>
      </div>
      <div class="col-sm-6">
        <h3><b>Tanam Pohon dengan menekan tombol Tanam</b></h3>
        <p>Dengan menanam pohon kita akan menyelamatkan bumi dan menetralkan kembali kandungan udara yang telah banyak tercemar.</p>
        <p><b>Note:</b><br>Untuk sekali penyiraman akan menumbuhkan pohon dibawah dalam beberapa tahun secara random, dan akan meminta untuk disiram kembali <br> <b>Warning:</b> <br> Anda tidak akan diperkenankan untuk menebang pohon jika umur pohon belum maksiman <b>20 Tahun</b></p>
      </div>
    </div>

    <!-- <button v-on:click="tanamPohon" type="button" name="button">Tanam</button> -->
    <div class="" v-for="(data, key) in semuadata">
      <div class="col-xs-6 col-md-4 column productbox">
        <div class="" v-if="data.umur <= 5">
          <img src="http://moziru.com/images/roots-clipart-plant-seed-6.png" class="img-responsive">
        </div>
        <div class="" v-else-if="data.umur <= 8">
          <img src="https://kmbeing.files.wordpress.com/2013/04/tree.png" class="img-responsive">
        </div>
        <div class="" v-else-if="data.umur <= 15">
          <img src="https://kmbeing.files.wordpress.com/2013/04/tree.png" class="img-responsive">
        </div>
        <div class="" v-else-if="data.umur <= 19">
          <img src="https://i.pinimg.com/originals/84/84/73/848473e6e4f6058c45fad750c5dd5a3c.png" class="img-responsive">
        </div>
        <div class="" v-else>
          <img src="http://img05.deviantart.net/60bf/i/2011/152/9/3/dead_tree_png_by_gd08-d3hs9tf.png" class="img-responsive">
        </div>

        <div class="producttitle">
          <h3><b>{{data.umur}}</b></h3>
          <p>Tinggi pohon anda: <b>{{data.tinggi}}</b> meter</p>
        </div>

        <div class="productprice">

          <div class="pull-right" v-if="statussiram == true">
          </div>

          <div class="pull-right" v-else-if="data.umur == 20">
            <a v-on:click="hapus(key)" class="btn btn-danger btn-sm" role="button">Tebang</a>

          </div>

          <div class="pull-right" v-else>
            <a v-on:click="tumbuhkan(data, key)" class="btn btn-danger btn-sm" role="button">Siram</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    hapus (key) {
      this.deletePohon(key)
    },
    tumbuhkan (data, key) {
      let obj = {
        data: data,
        key: key
      }
      console.log('coba', data, key)
      this.getSatuPohon(obj)
    },
    tanamPohon () {
      console.log('sampe')
      this.addManggo()
    },
    ...mapActions([
      'addManggo',
      'getPohon',
      'getSatuPohon',
      'deletePohon'
    ])
  },
  computed: {
    ...mapState([
      'pohonManggah',
      'semuadata',
      'statussiram'
    ])
  },
  created () {
    this.getPohon()
  },
  watch: {
    statussiram: function (isi) {
      console.log('berubah')
    }
  }
}
</script>

<style scoped>
.productbox {
    background-color:#ffffff;
	padding:10px;
	margin-bottom:10px;
	-webkit-box-shadow: 0 8px 6px -6px  #999;
	   -moz-box-shadow: 0 8px 6px -6px  #999;
	        box-shadow: 0 8px 6px -6px #999;
}

.producttitle {
  font-weight:bold;
  padding:5px 0 5px 0;
}

.productprice {
	border-top:1px solid #dadada;
	padding-top:5px;
}

.pricetext {
	font-weight:bold;
	font-size:1.4em;
}

.img-responsive {
  height: 200px;
}

a.button{
		background: #ECECEC;
		border-radius: 15px;
		padding: 10px 20px;
		display: block;
		font-family: arial;
		font-weight: bold;
		color:#7f7f7f;
		text-decoration: none;
		text-shadow:0px 1px 0px #fff;
		border:1px solid #a7a7a7;
		width: 145px;
		margin:0px auto;
		margin-top:100px;
		box-shadow: 0px 2px 1px white inset, 0px -2px 8px white, 0px 2px 5px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.1);
		-webkit-transition:box-shadow 0.5s;
	}
	a.button i{
		float: right;
		margin-top: 2px;
	}
	a.button:hover{
		box-shadow: 0px 2px 1px white inset, 0px -2px 20px white, 0px 2px 5px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.1);
	}
	a.button:active{
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white, 0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
		background:-webkit-linear-gradient(top, #d1d1d1 0%,#ECECEC 100%);
	}
</style>
