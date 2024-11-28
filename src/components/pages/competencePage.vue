<template>
  <div class="competence">
    <div class="upper-search_box">
      <material-input label="Найти компетенцию"
                      v-model="settings.searchValue"
                      class="input_search"/>
      <button class="competence_button_create" @click="modalClick(true)">
        Создать новую
      </button>
    </div>
    <div class="competence-box">
      <accordeon-competence-item
          v-for="gradeItem in sortedCompetences"
          :key="gradeItem.id"
          :id="gradeItem.id"
          :title="gradeItem.title"
          :content="gradeItem.content"
          :collapsed="settings.collapsedStates[gradeItem.id]"
          @update:collapsed="updateCollapsed(gradeItem.id, $event)"
      />
    </div>
  </div>
  <modal-admin
      v-if="settings.modalShow"
      @closeModal="modalClick(false)"
  />
</template>

<script>
import materialInput from "../ui_elements/materialInput.vue";
import modalAdmin from "../elements/main/modalAdmin.vue";
import AccordeonCompetenceItem from "../elements/main/accordeonCompetenceItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    content: {}
  },
  name: 'competencePage',
  components: {
    AccordeonCompetenceItem,
    materialInput,
    modalAdmin,
  },
  data() {
    return {
      settings: {
        searchValue: '',
        modalShow: false,
        collapsedStates: {},
      },
    }
  },
  computed: {
    ...mapGetters(["getCompetences"]),
    sortedCompetences() {
        return this.getCompetences.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
    }
  },
  mounted() {
      this.getGradesList()
  },
  methods: {
    ...mapActions([
      "fetchCompetenceData",
    ]),
    updateCollapsed(id, newValue) {
      if (this.settings.collapsedStates.hasOwnProperty(id)) {
        this.settings.collapsedStates[id] = newValue;
      } else {
        this.settings.collapsedStates = { ...this.settings.collapsedStates, [id]: newValue };
      }
    },
    getGradesList() {
        this.fetchCompetenceData().then(() => {
            this.getCompetences.forEach((gradeItem) => {
                this.settings.collapsedStates[gradeItem.id] = true;
            });
        });
    },
    modalClick(statement) {
      this.settings.modalShow = statement;
      this.getGradesList()
    }
  }
}
</script>

<style lang="scss" scoped>
.upper-search_box {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.competence {
    padding: 32px 0 0 32px;
    &-input {
        width: 50%;
    }

    &-button {
        margin-right: 8px;
        width: 50%;
    }
}
.input_search {
  min-width: 500px;
}
.competence_button_create {
  height: 50px;
  padding: 2px 7px;
  background-color: #38cc70;
  border: 2px;
  border-radius: 5px;
  margin-left: 15px;
  color: #ffff;
}
.competence-box{
  display: flex;
  flex-direction: column;
  max-width:880px;
  padding:2em 0 2em 0;
}
</style>