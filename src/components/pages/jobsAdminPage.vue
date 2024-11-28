<template>
  <div class="team-container">
    <div class="team-column" v-for="(team, index) in teams" :key="team.id">
      <div class="team-header">
        <h3>{{ team.name }}</h3>
        <i class="edit-icon" @click="editTeamName(team)">&#9998;</i>
      </div>
      <ul>
        <li v-for="member in team.members" :key="member.id">
          {{ member.name }}
          <i class="delete-icon" @click="removeMember(team, member)">&#128465;</i>
        </li>
      </ul>
      <div class="add-member">
        <select v-model="team.selectedMemberId">
          <option disabled value="">Выберите сотрудника</option>
          <option v-for="person in people" :value="person.id">{{ person.name }}</option>
        </select>
        <button @click="addMember(team, team.selectedMemberId)">Добавить сотрудника</button>
      </div>
    </div>
    <button @click="showModal = true">Создать команду</button>
    <modal-job-group
        :isVisible="showModal"
        @update:isVisible="value => showModal = value"
        @create-team="handleCreateTeam"
    ></modal-job-group>
  </div>
</template>

<script>
import ModalJobGroup from '../elements/main/modalJobGroup.vue';

export default {
  name: 'jobsAdminPage',
  components: {
    'modal-job-group': ModalJobGroup
  },
  data() {
    return {
      showModal: false,
      teams: [
        {
          id: 1,
          name: 'Разработка',
          members: [
            { id: 1, name: 'Алексей' },
            { id: 2, name: 'Марина' },
            { id: 3, name: 'Сергей' }
          ],
          selectedMemberId: null
        },
        {
          id: 2,
          name: 'Дизайн',
          members: [
            { id: 4, name: 'Екатерина' },
            { id: 5, name: 'Антон' }
          ],
          selectedMemberId: null
        }
      ],
      people: [
        { id: 6, name: 'Ольга' },
        { id: 7, name: 'Николай' },
        { id: 8, name: 'Дмитрий' },
        { id: 9, name: 'Ирина' }
      ]
    };
  },
  methods: {
    editTeamName(team) {
      const newTeamName = prompt('Введите новое название команды:', team.name);
      if (newTeamName !== null && newTeamName.trim() !== '') {
        team.name = newTeamName;
      }
    },
    addMember(team, memberId) {
      const memberToAdd = this.people.find(person => person.id === memberId);
      if (memberToAdd && !team.members.some(member => member.id === memberId)) {
        team.members.push(memberToAdd);
      }
      team.selectedMemberId = null;
    },
    removeMember(team, member) {
      team.members = team.members.filter(m => m.id !== member.id);
    },
    handleCreateTeam(newTeamName) {
      const newTeam = {
        id: this.teams.length + 1,
        name: newTeamName,
        members: [],
        selectedMemberId: null
      };
      this.teams.push(newTeam);
    }
  }
};
</script>

<style scoped>
.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-icon {
  color: red;
  cursor: pointer;
}
.edit-icon {
  cursor: pointer;
  color: yellow;
}

.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.team-column {
  width: calc(50% - 20px);
  background-color: #f7f7f7;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.team-column h3 {
  color: #333;
  margin-bottom: 15px;
}

.team-column ul {
  list-style: none;
  padding: 0;
}

.team-column li {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-member {
  margin-top: 20px;
}

.add-member select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(100% - 22px);
}

.add-member button {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-member button:hover {
  background-color: #4cae4c;
}
</style>