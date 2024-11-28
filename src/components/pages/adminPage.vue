<template>
  <div class="page">
    <div class="title">Панель администратора</div>
    <div class="container">
      <router-link :to="{ name: 'competencePage' }">
        <div class="card">
          <div class="block block-title">
            <div class="content">
              <div class="content-title">Компетенции</div>
            </div>
          </div>
          <div class="block block-content">
            <div class="content">
              <div class="descriptions__content">
                Создание и редактирование компетенций для развития
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'jobsAdminPage' }">
        <div class="card">
          <div class="block block-title">
            <div class="content">
              <div class="content-title">Моя команда</div>
            </div>
          </div>
          <div class="block block-content">
            <div class="content">
              <div class="descriptions__content">
                Управление должностями и требованиями для них
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'progressPage' }">
        <div class="card">
          <div class="block block-title">
            <div class="content">
              <div class="content-title">Прогресс</div>
            </div>
          </div>
          <div class="block block-content">
            <div class="content">
              <div class="descriptions__content">
                Управление развитием компетенций сотрудников
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";

</script>

<style lang="scss" scoped>
* {
  text-decoration: none;
}
.page {
  padding: 50px;
  background: #333;
  overflow-y: auto;
}
.title {
  font-size: 21px;
  font-weight: 600;
  color: #ffffff;
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
          text-decoration: none;
        opacity: 1;
      }
    }

    .block-content {
      transform: translateY(0);
    }
  }
}

.block {
  height: 200px;
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
    transition: 0.5s;
    text-decoration: none;

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
  overflow: hidden;
}

.descriptions__content {
  color: #333333;
  margin: 12px 0;
  line-height: 18px;
  font-size: 20px;
}

</style>