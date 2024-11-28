<template>
    <auth-background />
    <auth-form />
</template>

<script setup>
import {onMounted} from "vue";
import authBackground from "../elements/authPage/authBackground.vue";
import authForm from "../elements/authPage/authForm.vue";

onMounted(() => {
    document.querySelector('body').style.overflow = 'hidden'
})
</script>

<style lang="scss" scoped>
</style>