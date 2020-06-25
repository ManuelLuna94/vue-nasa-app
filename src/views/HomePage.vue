<template>
  <div class="container">
    <search-form />
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm'

export default {
  components: {
    SearchForm
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
</style>
