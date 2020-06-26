<template>
  <div class="wrapper">
    <router-link :to="`/details/${data.id}`">
      <img :src="data.imageUrl" class="image" />
      <div class="content">
        <span>{{ data.title }}</span>
        <span>{{ data.type }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style scoped>
.image {
  width: 100%;
}
.wrapper {
  flex-basis: 30%;
  height: 250px;
  overflow: hidden;
  margin: 15px;
  position: relative;
}

@media only screen and (max-width: 950px) {
  .wrapper {
    flex-basis: 45%;
  }
}

@media only screen and (max-width: 700px) {
  .wrapper {
    flex-basis: 100%;
    margin: 0;
  }
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.content span {
  display: inline-block;
  text-overflow: ellipsis;
}
.content span:nth-of-type(1) {
  font-size: 30px;
  font-weight: 300;
  width: 100%;
  height: 36px;
  overflow: hidden;
}
.content span:nth-of-type(2) {
  font-size: 16px;
  background-color: crimson;
  padding: 2px 5px;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
