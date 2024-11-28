<template>
  <div class="fixed-overlay">
    <div class="modal">
      <div class="modal_container">
        <img
            class="modal_icon-close"
            src="/src/assets/images/svg/close.svg"
            @click="closeModal"
        >
        <material-input
            class="modal_input"
            label="Название компетенции"
            v-model="grade"
        />
          <button class="modal_button" @click="createGrade">
              Создать
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialInput from "../../ui_elements/materialInput.vue";
export default {
    name: "modalAdmin",
    components: {
        MaterialInput
    },
    data() {
        return {
            grade: '',
        }
    },
    methods: {
        async createGrade() {
            if (this.grade) {
                await this.$store.dispatch('fetchCreateGrade', this.grade)
                this.closeModal()
            }
        },
        closeModal() {
            this.$emit('closeModal')
        }
    }
}
</script>

<style scoped lang='scss'>
* {
  box-sizing: border-box;
}

.fixed-overlay {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}

.modal {
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -100px;
    margin-top: -75px;

    &_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #fff;
        width: 400px;
        height: 200px;
        padding: 16px;
    }

    &_input {
        margin: 16px 24px 0 24px;
    }

    &_button {
        height: 50px;
        margin: 26px 24px 0 24px;
        background-color: #38cc70;
        border: 2px;
        border-radius: 5px;
        color: #ffff;
    }

    &_icon-close {
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 12px;
        right: 12px;
    }
}
</style>