<template>
  <div class="">
  	<div class="row justify-content-md-center">
  	<div class="form-group col-lg-4 autocomplete" style="width: 100%;">
  		<input type="text" class="form-control " id="" aria-describedby="searchHelp"  v-model="search"
    @input="onChange">
  		<ul class="autocomplete-results" v-show="isOpen">
  			<router-link tag="li" :to="'/symbol/'+result['1. symbol']"  v-for="(result, i) in results"  			:key="i"  class="autocomplete-result"><a>{{ result['2. name']}}</a></router-link>
  		</ul>
  		<small id="searchHelp" class="form-text text-muted " style="display: none;">Fetching latest results... </small>
  	</div>
  </div>




  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data() {
      return {
        search: '',
        results: [],
        isOpen: false,
      };
    },
  methods:{
  	onChange() {
  		if(this.search.length>=2){

  			let _self= this;

        $('#searchHelp').show();

  		fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+this.search+'&apikey=FWTPW4OEKK9YTUOK')
  		.then(function(response){
  			return response.json();
  		}).then(function(myJson) {
  			console.log(myJson.bestMatches[0]['2. name']);
  			_self.results =myJson.bestMatches;
        _self.isOpen = true;
        $('#searchHelp').hide();
  			//console.log(JSON.stringify(myJson));
  		}).catch(function(e){
  			console.log(e);
	  	});
         
        //this.filterResults();
    }
      },
      filterResults() {
        this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      },
      setResult(result) {
        this.search = result;
        this.isOpen = false;
      },
  }

}
</script>
<style>
	
	.autocomplete {
    position: relative;
    width: 100%;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>