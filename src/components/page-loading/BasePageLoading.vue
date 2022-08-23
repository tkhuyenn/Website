<template>
  <div class="load-main">
    <!-- <base-icon icon="spin-loading" size="150" /> -->
    <!-- <div id="loader">
      <div id="shadow"></div>
      <div id="box"></div>
    </div> -->
    <div class="loader">
      <div v-if="coinMain === 'CLM'" class="vertical-centered-box">
        <div class="content">
          <div class="loader-circle loader-circle--clm" />
          <div class="loader-line-mask">
            <div class="loader-line loader-line--clm" />
          </div>
          <base-icon icon="icon-clm" style="font-size: 79px" />
        </div>
      </div>
      <img v-else src="@/assets/images/loading.gif" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')
  @Component
  export default class BasePageLoading extends Vue {
    @beBase.State('coinMain') coinMain!: string
  }
</script>

<style scoped lang="scss">
  // #loader {
  //   position: absolute;
  //   top: calc(50% - 20px);
  //   left: calc(50% - 20px);
  // }
  // @keyframes loader {
  //   0% {
  //     left: -100px;
  //   }
  //   100% {
  //     left: 110%;
  //   }
  // }
  // #box {
  //   width: 100px;
  //   height: 100px;
  //   background: #0151fc;
  //   animation: animate 0.5s linear infinite;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   border-radius: 3px;
  // }
  // @keyframes animate {
  //   17% {
  //     border-bottom-right-radius: 3px;
  //   }
  //   25% {
  //     transform: translateY(9px) rotate(22.5deg);
  //   }
  //   50% {
  //     transform: translateY(18px) scale(1, 0.9) rotate(45deg);
  //     border-bottom-right-radius: 40px;
  //   }
  //   75% {
  //     transform: translateY(9px) rotate(67.5deg);
  //   }
  //   100% {
  //     transform: translateY(0) rotate(90deg);
  //   }
  // }
  // #shadow {
  //   width: 100px;
  //   height: 10px;
  //   background: #000;
  //   opacity: 0.1;
  //   position: absolute;
  //   top: 116px;
  //   left: 0;
  //   border-radius: 50%;
  //   animation: shadow 0.5s linear infinite;
  // }
  // @keyframes shadow {
  //   50% {
  //     transform: scale(1.2, 1);
  //   }
  // }

  .load-main {
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    position: absolute;
    top: 0;
    left: 0;
    background: #ffffff;
    .loading-banner {
      width: 100%;
      height: 100%;
    }
  }
  .hidden {
    display: none;
  }
  .loader {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fbfbfb;
    img {
      width: 15%;

      @media (max-width: 768px) {
        width: 55%;
      }
    }
    .vertical-centered-box {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .vertical-centered-box:after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: -0.25em;
    }
    .vertical-centered-box .content {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      font-size: 0;
    }
    .loader-circle {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px #9900cc29;
      margin-left: -60px;
      margin-top: -60px;
    }
    .loader-circle--clm {
      box-shadow: inset 0 0 0 3px #51c1b061;
    }
    .loader-line-mask {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 60px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      overflow: hidden;
      -webkit-transform-origin: 60px 60px;
      -moz-transform-origin: 60px 60px;
      -ms-transform-origin: 60px 60px;
      -o-transform-origin: 60px 60px;
      transform-origin: 60px 60px;
      -webkit-mask-image: -webkit-linear-gradient(top, #000000, rgba(0, 0, 0, 0));
      -webkit-animation: rotate 1.2s infinite linear;
      -moz-animation: rotate 1.2s infinite linear;
      -o-animation: rotate 1.2s infinite linear;
      animation: rotate 1.2s infinite linear;
    }
    .loader-line-mask .loader-line {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px #9900cc;
    }
    .loader-line-mask .loader-line--clm {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px #51c1b0;
    }
    #particles-background,
    #particles-foreground {
      left: -51%;
      top: -51%;
      width: 202%;
      height: 202%;
      -webkit-transform: scale3d(0.5, 0.5, 1);
      -moz-transform: scale3d(0.5, 0.5, 1);
      -ms-transform: scale3d(0.5, 0.5, 1);
      -o-transform: scale3d(0.5, 0.5, 1);
      transform: scale3d(0.5, 0.5, 1);
    }
    #particles-background {
      background: #2c2d44;
      background-image: -moz-linear-gradient(45deg, #3f3251 2%, #002025 100%);
      background-image: -webkit-linear-gradient(45deg, #3f3251 2%, #002025 100%);
      background-image: linear-gradient(45deg, #3f3251 2%, #002025 100%);
    }
    lesshat-selector {
      -lh-property: 0;
    }
    @-webkit-keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @-moz-keyframes rotate {
      0% {
        -moz-transform: rotate(0deg);
      }
      100% {
        -moz-transform: rotate(360deg);
      }
    }
    @-o-keyframes rotate {
      0% {
        -o-transform: rotate(0deg);
      }
      100% {
        -o-transform: rotate(360deg);
      }
    }
    @keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    [not-existing] {
      zoom: 1;
    }
    lesshat-selector {
      -lh-property: 0;
    }
    @-webkit-keyframes fade {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.25;
      }
    }
    @-moz-keyframes fade {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.25;
      }
    }
    @-o-keyframes fade {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.25;
      }
    }
    @keyframes fade {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.25;
      }
    }
    [not-existing] {
      zoom: 1;
    }
    lesshat-selector {
      -lh-property: 0;
    }
    @-webkit-keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @-moz-keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @-o-keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    [not-existing] {
      zoom: 1;
    }
  }
</style>
