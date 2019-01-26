<template>
  <div class="symbol">
    <div class="row " style="float: right;display: none;margin-right: 0px;" id="addToFav" >
      <button type="button" class="btn btn-success" style="margin-bottom: 2px;" v-on:click="favorites" v-if="!isFav">Add to favorites</button>
      <button type="button" class="btn btn-success" style="margin-bottom: 2px;" v-on:click="favorites" v-if="isFav">Remove from favorites</button>
    </div>
    <div class="row justify-content-md-center" style="display: none;" id="symbolHelp">
      <small  class="form-text text-muted " >Fetching the symbol data... </small>
    </div>
  <table class="table table-dark" id="result_table" style="display: none;">
  <thead>
    <tr>
      <th scope="col">#DATE</th>
      <th scope="col">OPEN</th>
      <th scope="col">HIGH</th>
      <th scope="col">LOW</th>
      <th scope="col">CLOSE</th>
      <th scope="col">VOLUME</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(r,i) in response">
      <th scope="row">{{i}}</th>
      <td>{{r['1. open']}}</td>
      <td>{{r['2. high']}}</td>
      <td>{{r['3. low']}}</td>
      <td>{{r['4. close']}}</td>
      <td>{{r['5. volume']}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import store from '../store.js';
export default {
  name: 'home',
  components: {
  },
  data() {
      return {
        search: '',
        response: [],
        isOpen: false,
        symbol:'',
        isFav:false
      };
    },

    mounted(){

       this.isFav=store.getters.isFav( this.$route.params.id);
       console.log(this.isFav);
      $('#symbolHelp').show();
      this.symbol= this.$route.params.id; 
       let _self= this;
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+this.symbol+'&interval=5min&apikey=FWTPW4OEKK9YTUOK')
      .then(function(response){
        return response.json();
      }).then(function(myJson) {
        _self.response = myJson['Time Series (5min)'];
        $('#result_table').show();
        $('#addToFav').show();
        $('#symbolHelp').hide();
      }).catch(function(e){
        console.log(e);
      });

    },
  methods:{
    favorites: function(){

      if(!this.isFav){
        store.commit('add',this.symbol);
        this.isFav=true;
      }else{
        store.commit('remove',this.symbol);

        this.isFav=false;
      }
      
    },
    created: function() {  
      document.title = this.symbol+' • smallcase app'  
      document.head.querySelector('meta[name=description]').content = 'New Description'  
}
  }

}
</script>

</script>