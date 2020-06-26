<template>
  <div>
    <div class="container">
      <search-form :updateResults="updateResults" />
    </div>
    <div v-if="results.length > 0" class="items">
      <Item v-for="result in results" :key="result.id" :data="result" />
    </div>
    <h3 v-else>Loading...</h3>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm'
import Item from '@/components/Item'

export default {
  components: {
    SearchForm,
    Item
  },
  data: () => ({
    results: []
  }),
  methods: {
    updateResults(data) {
      this.results = data
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: auto;
  background-color: var(--color-sub);
  padding: 3rem 2rem;
}
.items {
  display: flex;
  flex-wrap: wrap;
  padding: 0 1%;
  justify-content: center;
}

@media only screen and (max-width: 700px) {
  .items {
    padding: 0;
  }
}
</style>
