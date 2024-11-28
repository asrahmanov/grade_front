<template>
  <div
    class="menu"
    :class="menuExpanded ? 'expanded' : ''"
  >
    <div
      class="burger"
      :style="`transform: translate(${curveX}px, ${curveY}px);`"
      @mouseenter="menuExpanded = true"
    >
      <div class="burger__line"></div>
      <div class="burger__line"></div>
      <div class="burger__line"></div>
    </div>
    <div
      class="menu-inner"
      @mouseenter="menuExpanded = true"
      @mouseleave="menuExpanded = false"
    >
      <div class="menu-list">
        <router-link class="menu-item" :to="{ name: 'personalCompetenciesPage' }">Личностные компетенции</router-link>
        <router-link class="menu-item" to="/">Карьерная перспектива</router-link>
        <router-link class="menu-item" :to="{ name: 'myTeam' }">Моя команда</router-link>
        <router-link v-if="user.rights === 'admin'" class="menu-item" :to="{ name: 'adminPage' }">Админка</router-link>
      </div>
    </div>
  
    <svg
      version="1.1"
      id="blob"
      :style="`width: ${curveX + 60}px;`"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        id="blob-path"
        :d="blobPath"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  mouseX:{ type: Number },
  mouseY: { type: Number },
})

const store = useStore();
const menuExpanded = ref(false)
const curveX = ref(10)
const curveY = ref(0)
const blobPath = ref('M60,500H0V0h60c0,0,0,172,0,200S60,900,60,500z')

async function initUser() {
    let authToken = store.getters.getAuthToken
    await store.dispatch('fetchUser', { authToken })
}

const user = computed(() => {
    return store.getters.getUser
})

onMounted(async () => {
    await initUser()

    const height = window.innerHeight;
    const hoverZone = 150;
    const expandAmount = 20;
    const anchorDistance = 200;
    const curviness = anchorDistance - 40;

    let targetX = 0
    let xitteration = 0
    let yitteration = 0

    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue
    }
  
    function svgCurve() {
        let mouseX = props.mouseX
        let mouseY = props.mouseY
        if (mouseX > 300) {
            mouseX = 0
            mouseY = 0
    }

        if ((curveX.value > mouseX - 1) && (curveX.value < mouseX + 1)) {
            xitteration = 0;
        } else {
            if (menuExpanded.value) {
                targetX = 0;
            } else {
                xitteration = 0;
                if (mouseX > hoverZone || mouseX === 0) {
                    targetX = 0;
                } else {
                    targetX = -((60+expandAmount)/100)*(mouseX-hoverZone);
                }
            }
            xitteration++;
        }

        if ((curveY.value > mouseY-1) && (curveY.value < mouseY+1)) {
            yitteration = 0;
        } else {
            yitteration = 0;
            yitteration++;
        }

        curveX.value = easeOutExpo(xitteration, curveX.value, targetX-curveX.value, 100);
        curveY.value = easeOutExpo(yitteration, curveY.value, mouseY-curveY.value, 100);
        if (curveY.value < 30) {
            curveY.value = 30
        }

        blobPath.value = "M60," + height + "H0V0h60v" + (curveY.value-anchorDistance) + "c0,"
            + curviness + ","  +curveX.value + "," + curviness + "," + curveX.value + "," + anchorDistance
            + "S60," + curveY.value + ",60," + (curveY.value + anchorDistance*2) + "V" + height + "z";

        window.requestAnimationFrame(svgCurve);
    }

    window.requestAnimationFrame(svgCurve);
})
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  position: fixed;
  background-color: #FED057;
  width: 300px;
  transition: 1000ms all cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateX(-100%);
  left: 60px;
  z-index: 9999;

  &.expanded {
    transform: translateX(0%);
    left: 0px;
  }
}
.menu-inner {
  width: 100%;
  height: 100%;
  position: relative;
}

#blob {
  top: 0;
  z-index: -1;
  right: 60px;
  transform: translateX(100%);
  height: 100%;
  position: absolute;
}

#blob-path {
  height: 100%;
  fill:  #FED057;
}

.burger {
  right: 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  margin-top: -10px;  
  &__line {
    width: 100%;
    height: 4px;
    background-color: #fff;
    position: absolute;

    &:nth-child(2) {
      top: 50%;
      margin-top: -2px;
    }

    &:nth-child(3) {
      bottom: 0;
    }
  }
}

.menu-list {
  padding: 0;
  list-style: none;
  width: 80%;
  margin-left: 10%;
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #fff;
  font-family: sans-serif;
  padding: 10px 0;
}
</style>