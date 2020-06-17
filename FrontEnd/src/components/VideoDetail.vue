<template>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="my-4">예고편</h3>
      <button class="btn btn-success" id="video-toggle" @click="foldToggle">접기</button>
    </div>

    <div class="video container embed-responsive embed-responsive-16by9" v-if="video">
      <iframe :src="videoURL" frameborder="0"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "VideoDetail",
        props: {
            video: Object,
            currentUser: Object
        },
        data() {
            return {
                videoURL: `https://www.youtube.com/embed/${this.video.id.videoId}`
            }
        },
        methods: {
            foldToggle() {
                const video = document.querySelector(".video")
                const button = document.querySelector("#video-toggle")
                video.classList.toggle("disabled")
                if (video.classList.contains("disabled")) {
                    button.innerText = "펼치기"
                } else {
                    button.innerText = "접기"
                }
            },

        }
    }
</script>

<style scoped>
  button {
    width: 70px;
    height: 30px;
    padding-top: 2px;
    padding-bottom: 0;
  }
  .disabled{
    display: none;
  }
  i {
    font-size: 2rem;
  }
  .up {
    width: 20px !important;
    height: 20px !important;
  }
</style>