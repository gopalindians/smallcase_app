<template>
  <div class="symbol">
    <div class="row justify-content-md-center" style="display: none;" id="favoritesHelp">
      <small  class="form-text text-muted " >You donot have  any favorites... </small>
    </div>
  <table class="table table-dark" id="result_table" style="display: none;">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">SYMBOL</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(r,i) in favorites">
      <th scope="row">{{i+1}}</th>
      <td>  <router-link :to="'/symbol/'+r"    :key="i" ><a>{{r}}</a></router-link></td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import store from '../store.js';
export default {
  name: 'favorites',
  data() {
      return {
        favorites: []
      };
    },

    mounted(){
      if(store.getters.allFavorites.length>0){
        this.favorites=   store.getters.allFavorites;  
        $('#result_table').show();
      }else{
        $('#favoritesHelp').show();
      }
    },
}
</script>

</script>