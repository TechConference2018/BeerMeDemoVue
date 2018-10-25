<template>
  <div id="app">
    <img src="./assets/beer.svg">
    <h1>{{ msg }}</h1>
    <div id="loading" v-show="loading">
      <div class="text">
        <span class="waddle">🍻</span><br>
        Loading...
      </div>
    </div>
    <div id="search">
      <form action="" method="post" @submit.prevent="update">
      	<input type="text" id="query" placeholder="Name..." class="form-control" autocomplete="off" autofocus v-model="query">
      	<select class="form-control" v-model="state">
      		<option value="">State...</option>
      		<option value="Alabama">Alabama</option>
      		<option value="Alaska">Alaska</option>
      		<option value="Arizona">Arizona</option>
      		<option value="Arkansas">Arkansas</option>
      		<option value="California">California</option>
      		<option value="Colorado">Colorado</option>
      		<option value="Connecticut">Connecticut</option>
      		<option value="Delaware">Delaware</option>
      		<option value="District of Columbia">District of Columbia</option>
      		<option value="Florida">Florida</option>
      		<option value="Georgia">Georgia</option>
      		<option value="Hawaii">Hawaii</option>
      		<option value="Idaho">Idaho</option>
      		<option value="Illinois">Illinois</option>
      		<option value="Indiana">Indiana</option>
      		<option value="Iowa">Iowa</option>
      		<option value="Kansas">Kansas</option>
      		<option value="Kentucky">Kentucky</option>
      		<option value="Louisiana">Louisiana</option>
      		<option value="Maine">Maine</option>
      		<option value="Maryland">Maryland</option>
      		<option value="Massachusetts">Massachusetts</option>
      		<option value="Michigan">Michigan</option>
      		<option value="Minnesota">Minnesota</option>
      		<option value="Mississippi">Mississippi</option>
      		<option value="Missouri">Missouri</option>
      		<option value="Montana">Montana</option>
      		<option value="Nebraska">Nebraska</option>
      		<option value="Nevada">Nevada</option>
      		<option value="New Hampshire">New Hampshire</option>
      		<option value="New Jersey">New Jersey</option>
      		<option value="New Mexico">New Mexico</option>
      		<option value="New York">New York</option>
      		<option value="North Carolina">North Carolina</option>
      		<option value="North Dakota">North Dakota</option>
      		<option value="Ohio">Ohio</option>
      		<option value="Oklahoma">Oklahoma</option>
      		<option value="Oregon">Oregon</option>
      		<option value="Pennsylvania">Pennsylvania</option>
      		<option value="Rhode Island">Rhode Island</option>
      		<option value="South Carolina">South Carolina</option>
      		<option value="South Dakota">South Dakota</option>
      		<option value="Tennessee">Tennessee</option>
      		<option value="Texas">Texas</option>
      		<option value="Utah">Utah</option>
      		<option value="Vermont">Vermont</option>
      		<option value="Virginia">Virginia</option>
      		<option value="Washington">Washington</option>
      		<option value="West Virginia">West Virginia</option>
      		<option value="Wisconsin">Wisconsin</option>
      		<option value="Wyoming">Wyoming</option>
      	</select>
      	<button type="submit" class="btn">Search</button>
      	<button type="button" class="btn" v-on:click="clearSearch">X</button>
      </form>
    </div>
    <ul class="brewery-list">
			<li v-for="brewery in breweries" :key="brewery.id">
				<h2>{{ brewery.name }} <span class="marker">{{ brewery.brewery_type }}</span></h2>
				<p>{{ brewery.street }}<br>
				{{ brewery.city }}, {{ brewery.state }}</p>
				<p v-if="brewery.website_url"><a :href="brewery.website_url" target="_blank" class="more-link">Visit online...</a></p>
			</li>
		</ul>
		<div v-if="breweries.length === 0">
			<p>No breweries found. 😭</p>
		</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Beer Me 🇺🇸',
      query: '',
      state: '',
      loading: false,
      dataurl: 'https://api.openbrewerydb.org/breweries',
      limit: 10,
      breweries: []
    }
  },
  methods: {
    update() {
      this.loading = true;
      var params = [];
      if (this.query !== '') {
        params.push('by_name=' + this.query);
      }
      if (this.state !== '') {
        params.push('by_state=' + this.state);
      }
      params.push('per_page=' + this.limit);
      var qstring = '?' + params.join('&');
      var callurl = this.dataurl + qstring;
      console.log(callurl);
      axios.get(callurl).then(
        (response) => {
          this.loading = false;
          this.breweries = response.data;
        }, (error) => {
          this.loading = false;
          console.log('Loading error: ' + error);
        }
      )
    },
    clearSearch() {
      this.query = '';
      this.state = '';
      this.update();
    }
  },
  mounted() {
    this.update();
  }
}
</script>
