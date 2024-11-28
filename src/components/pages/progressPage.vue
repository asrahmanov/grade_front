<template>
  <div class="page">
    <div class="title">Назначение компетенций</div>
    <div class="tables">
      <div>
        <div class="label">
          Выберите пользователей/группы
        </div>
        <v-text-field v-model="searchUser" bg-color="#fff" label="Поиск пользователя" density="compact" single-line hide-details></v-text-field>
        <v-data-table
          class="progress-table"
          v-model="selectedUsers"
          :group-by="groupBy"
          :headers="headerUsers"
          :items="itemsUsers"
          show-select
          hide-default-footer
          :search="searchUser"
          items-per-page="-1"
          height="450px"
          fixed-header
          no-data-text="Не найдены пользователи/группы"
        ></v-data-table>
      </div>
      <div>
        <div class="label">
          Выберите компетенцию
        </div>
        <v-text-field v-model="searchCompetention" bg-color="#fff" label="Поиск компетенции" density="compact" single-line hide-details></v-text-field>
        <v-data-table
          class="progress-table"
          v-model="selectedCompetention"
          :headers="headersCompetention"
          :items="itemsCompetention"
          show-select
          hide-default-footer
          :search="searchCompetention"
          items-per-page="-1"
          height="450px"
          fixed-header
          no-data-text="Не найдены компетенции"
        ></v-data-table>
      </div>
    </div>
    <div class="footer">
      <v-btn class="btn__appoint" :class="disabledBtn ? 'btn__appoint_disabled' : ''"> Назначить </v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'progressPage',
  components: {
  },
  data() {
    return {
      selectedCompetention: [],
      selectedUsers: [],
      itemsCompetention: [],
      headersCompetention: [
        { title: 'Компетенции', align: 'start', key: 'title' },
      ],
      searchCompetention: '',
      searchUser: '',
      headerUsers: [
        { title: 'Группа', align: 'start', key: 'data-table-group', width: '180px' },
        { title: 'Имя', align: 'start', key: 'fullname' },
      ],
      itemsUsers: [],
      groupBy: [
        {
          key: 'group',
          title: 'Группы',
        },
      ],
    }
  },
  computed: {
    disabledBtn() {
      return !this.selectedCompetention.length || !this.selectedUsers.length
    }
  },
  async mounted() {
    try {
      // получение всех групп
      const resGroups = await axios({
          method: 'GET',
          url: import.meta.env.VITE_API_GRADE + '/api/grade/jobs/group/getAll',
          headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
      })
      console.log('resGroups', resGroups);
      let users = resGroups.data.data.users || []
      let jobs = resGroups.data.data.job || []
      users = users.map(user => {
        return {
          ...user,
          group: jobs.find(job => job.id === user.group_id)?.name || 'Без группы'
        }
      })
      this.itemsUsers.push(...users)

      // получение компетенций
      const resCompetentions = await axios({
        method: 'GET',
        url: import.meta.env.VITE_API_GRADE + '/api/grade/getList',
        headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
      });
      this.itemsCompetention.push(...resCompetentions.data.data)
    } catch(error) {
      console.log(error)
    }
  }
}
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
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.5;
  font-family: Open Sans;
  font-style: normal;
  padding-bottom: 45px;
}

.tables {
  display: grid;
  grid-template-columns: calc(50% - 50px) calc(50% - 50px);
  gap: 100px;
  margin: auto;
  max-width: 1200px;
}

.label {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.5;
  font-family: Open Sans;
  font-style: normal;
  padding-bottom: 25px;
}

.progress-table {
  &:deep(.v-data-table-footer) {
    display: none;
  }
  &:deep(.v-data-table-header__content) {
    font-weight: 600;
    font-size: 16px;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 40px;
  margin: auto;
  max-width: 1200px;
}
.btn__appoint {
  background-color: #FED057;

  &_disabled {
    cursor: default;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>