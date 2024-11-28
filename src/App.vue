<template>
    <div class="page" @mousemove="mousemove">
        <Menu :mouseX="mouseX" :mouseY="mouseY" />
        <RouterView />
    </div>
</template>

<script setup>
import Menu from './components/elements/menu.vue'
import { onMounted, ref } from "vue";

const mouseX = ref(0)
const mouseY = ref(0)

function mousemove (e) {
    mouseX.value = e.pageX;  
    mouseY.value = e.pageY;
}
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
    padding-left: 60px;
}
</style>

<style>
@font-face {
  font-family: 'Open Sans';
  font-weight: 300;
  font-style: normal;
  src: url('./assets/fonts/openSans/OpenSans-Light.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 400;
  font-style: normal;
  src: url('./assets/fonts/openSans/OpenSans-Regular.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 600;
  font-style: normal;
  src: url('./assets/fonts/openSans/OpenSans-SemiBold.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 700;
  font-style: normal;
  src: url('./assets/fonts/openSans/OpenSans-Bold.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 800;
  font-style: normal;
  src: url('./assets/fonts/openSans/OpenSans-ExtraBold.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 300;
  font-style: italic;
  src: url('./assets/fonts/openSans/OpenSans-LightItalic.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 400;
  font-style: italic;
  src: url('./assets/fonts/openSans/OpenSans-Italic.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 600;
  font-style: italic;
  src: url('./assets/fonts/openSans/OpenSans-SemiBoldItalic.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 700;
  font-style: italic;
  src: url('./assets/fonts/openSans/OpenSans-BoldItalic.ttf')  format('truetype')
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 800;
  font-style: italic;
  src: url('./assets/fonts/openSans/OpenSans-ExtraBoldItalic.ttf')  format('truetype')
}
</style>