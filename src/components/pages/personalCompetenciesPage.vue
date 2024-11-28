<template>
    <div class="page">
        <div class="title">Точки развития</div>
        <div class="container">
            <div class="card" v-for="grade in grades" :key="grade.id">
                <div class="block block-title">
                    <div class="content">
                        <div class="content-title">{{ grade.title }}</div>
                        <div>
                            <v-progress-linear
                                :location="false"
                                bg-color="#92aed9"
                                color="#38cc70"
                                height="12"
                                max="10"
                                min="0"
                                model-value="3"
                                rounded
                            ></v-progress-linear>
                            <div class="progress__points text-h6">3/10</div>
                        </div>
                    </div>
                </div>
                <div class="block block-content">
                    <div class="list">
                        <div
                            v-for="gradeItem in grade.items"
                            :key="gradeItem.id"
                            class="list__content"
                        >
                            {{ gradeItem.title }}
                            <v-progress-linear
                                :location="false"
                                bg-color="#112544"
                                color="#38cc70"
                                height="12"
                                max="10"
                                min="0"
                                model-value="3"
                                rounded
                            ></v-progress-linear>
                            <div class="list__counter">3/10</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";

const grades = ref([])
const gradeItems = ref([])

onMounted(async () => {
    // получение всех grades
    const res = await axios({
        method: 'GET',
        url: import.meta.env.VITE_API_GRADE + '/api/user/grade/get',
        headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
    })
    grades.value = []
    // по каждому grade достаем его описание
    res.data.data.forEach(async grade => {
        const res = await axios({
            method: 'GET',
            url: import.meta.env.VITE_API_GRADE + '/api/user/grade/getById?grade_parent_id=' + grade.grade_parent_id,
            headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
        })
        grade.items = res.data.data
        grades.value.push(grade)
    });
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
    padding-bottom: 10px;
}

.container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 50px;
    width: 100%;
}

.card{
    position: relative;
    cursor: pointer;

    &:hover {
        .block-title {
            background: #FED057;
            transform: translateY(0);

            .content {
                opacity: 1;
            }
        }

        .block-content {
            transform: translateY(0);
            max-height: none;
        }
    }
}

.block {
    min-height: 200px;
    transition: 0.5s;
}

.block-title {
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);

    .content {
        opacity: 0.7;
        transition: 0.5s;
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: calc(100% - 60px);

        &-title {
            margin: 10px 0 0;
            padding: 0px 8px;
            color: #fff;
            text-align: center;
            font-size: 22px;
        }
    }
}

.block-content {
    position: relative;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 20px 40px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px); 
    max-height: 200px;
    overflow: hidden;
}

.list {
    width: 100%;
}

.list__content {
    margin: 12px 0;
    line-height: 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.list__counter {
    display: flex;
    justify-content: flex-end;
}

.progress__points {
    display: flex;
    justify-content: flex-end;
    color: white;
}
.progress__contet {
    display: flex;
    justify-content: space-between;
}
</style>