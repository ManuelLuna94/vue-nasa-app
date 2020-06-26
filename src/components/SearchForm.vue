<template>
  <form @submit.prevent="handleSubmit" role="form">
    <h1>Query builder</h1>
    <fieldset class="input-container">
      <input
        class="keywords-input"
        type="text"
        v-model="keywordsToSearch"
        placeholder="Search something like 'Apollo'..."
      />
    </fieldset>
    <div class="menu">
      <fieldset class="media-selectors">
        <label>
          Video
          <input name="video" type="checkbox" v-model="includeVideo" />
          <span class="checkmark"></span>
        </label>
        <label>
          Images
          <input name="images" type="checkbox" v-model="includeImages" />
          <span class="checkmark"></span>
        </label>
      </fieldset>
      <fieldset class="media-selectors">
        <label class="date-label">
          <span>From</span>
          <input type="date" v-model="dateStart" />
        </label>
        <label class="date-label">
          <span>To</span>
          <input type="date" v-model="dateEnd" />
        </label>
      </fieldset>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    keywordsToSearch: '',
    includeImages: true,
    includeVideo: true,
    dateStart: '1970-01-01',
    dateEnd: '2020-01-01'
  }),
  methods: {
    handleSubmit() {
      axios.get(this.computedQuery())
    },
    computedQuery() {
      const q = encodeURI(this.keywordsToSearch)
      const images = this.includeImages ? 'image' : ''
      const video = this.includeVideo ? 'video' : ''
      const start = this.dateStart.slice(0, 4)
      const end = this.dateEnd.slice(0, 4)
      return `images-api.nasa.gov/search?q=${q}&media_type=${video},${images}&year_start=${start}&year_end=${end}`
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 100;
  font-size: 44px;
}
form {
  background-color: var(--color-sub);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
}
fieldset {
  outline: none;
  border: none;
  margin: 5px 0;
}
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.input-container {
  width: 100%;
}
.keywords-input {
  padding: 10px 15px;
  width: 100%;
  border-radius: 25px;
  border: none;
  margin: 1rem 0;
  color: var(--color-dark-1);
}
.keywords-input:focus {
  outline: none;
}
label {
  position: relative;
  font-size: 22px;
  padding-left: 30px; /* To make space for checkmarks */
  margin: 25px;
}
input[type='checkbox'] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 0;
  height: 0;
}
.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  cursor: pointer;
  background-color: #c5c1c17a;
  border-radius: 100%;
}
.checkmark::before {
  content: '';
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background-color: #3b3a3aef;
  transition: transform 0.1s ease;
}
input[type='checkbox']:checked ~ .checkmark::before {
  transform: translate(-50%, -50%) scale(1);
}
.media-selectors {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: flex-start;
}
.date-label {
  display: flex;
  justify-content: space-between;
}
.date-label span {
  margin-left: -5px;
  margin-right: 5px;
}
</style>
