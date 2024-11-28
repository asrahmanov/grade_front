<template>
    <svg class="background-svg"
         width="0" height="0"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <filter id="water">
            <feTurbulence type="fractalNoise" baseFrequency=".05 .05" numOctaves="1" result="noise1"></feTurbulence>
            <feColorMatrix in="noise1" type="hueRotate" values="0" result="noise2">
                <animate attributeName="values" from="0" to="360" dur="1s" repeatCount="indefinite"/>
            </feColorMatrix>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="7" in="SourceGraphic" in2="noise2" />
        </filter>
    </svg>
    <img class="background" src="/src/assets/images/jpg/auth-background.jpeg" alt="Hawaiian water crashes against the rocks">
</template>

<script setup>
</script>

<style lang="scss" scoped>
.background {
    width: 110vw;
    height: 110vh;
    position: absolute;
    top: -5vh;
    left: -5vw;
    object-fit: cover;
    filter: url(#water);
    z-index: 9999;

    &-svg {
        position: absolute;
    }
}
</style>