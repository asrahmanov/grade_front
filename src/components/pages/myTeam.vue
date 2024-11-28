<template>
    <div class="page">
        <div class="title">Моя команда: {{ job ? job.name : '' }}</div>
        <div class="container">
            <v-card class="card" v-for="people in peoples" :key="people.id">
                <v-img
                  height="200px"
                  width="200px"
                  src="/src/assets/images/jpg/avatar.jpg"
                  cover
                  class="card__img"
                ></v-img>
                <v-card-title class="card__title"> {{ people ? people.fullname : '' }} </v-card-title>
                <v-card-subtitle> {{ people ? people.job_title : '' }} </v-card-subtitle>
                <v-card-subtitle class="subtitle__email"> {{ people ? people.email : '' }} </v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";

const peoples = ref([])
const job = ref(null)

onMounted(async () => {
    const res = await axios({
        method: 'GET',
        url: import.meta.env.VITE_API_GRADE + '/api/user/job/getGroup',
        headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
    })
    peoples.value = res.data.data.users
    job.value = res.data.data.job
})
</script>

<style lang="scss" scoped>
.page {
    padding: 50px;
    background: #333;
    overflow-y: auto;
}
.title {
    font-size: 21px;
    font-weight: 600;
    color: #ffffff;
    opacity: 0.5;
    font-family: Open Sans;
    font-style: normal;
    padding-bottom: 45px;
}
.container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 50px;
    width: 100%;
}
.card{
    padding: 12px 16px;
    max-width: 100%;
}
.card__img{
  margin: auto;
}
.card__title{
    white-space: normal;
    line-height: 1.4;
}
.subtitle__email {
    white-space: normal;
    line-height: 1.4;
}
</style>