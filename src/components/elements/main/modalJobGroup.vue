<template>
  <div v-if="isVisible" class="modalJobGroup">
    <div class="modalJobGroup-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Создать новую команду</h3>
      <input type="text" v-model="newTeamName" placeholder="Название команды" />
      <button @click="createTeam">Создать команду</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalJobGroup',
  props: ['isVisible'],
  data() {
    return {
      newTeamName: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    },
    createTeam() {
      if (this.newTeamName.trim()) {
        this.$emit('create-team', this.newTeamName);
        this.newTeamName = '';
        this.closeModal();
      }
    }
  }
};
</script>

<style scoped>
.modalJobGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modalJobGroup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.close {
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>