<template>
    <div class="accordion">
      <dl>
        <dt>
          <a
              :href="'#accordion' + id"
              :aria-expanded="!collapsed"
              :aria-controls="'accordion' + id"
              class="accordionTitle js-accordionTrigger"
              @click.prevent="toggleAccordion"
          >
              <div class="accordion-content">
                  <div></div>
                  <div v-if="!onUpdate">{{ title }}</div>
                  <input
                      v-else
                      type="text"
                      v-model="updatingGrade"
                      class="ghost-input"
                      placeholder="Введите новое название навыка"
                      required
                      autofocus
                  >
                  <div v-if="!onUpdate" class="accordion-content-icons">
                      <img
                          @click.stop="updateGrade"
                          class="icon-update"
                          src="/src/assets/images/svg/pen.svg"
                      >
                      <img
                          @click.stop="deleteGrade"
                          src="/src/assets/images/svg/cross.svg"
                      >
                  </div>
                  <div v-else class="accordion-content-icons">
                      <img
                          @click.stop="acceptUpdateGrade"
                          class="icon-update"
                          src="/src/assets/images/svg/accept.svg"
                      >
                      <img
                          @click.stop="updateGrade"
                          src="/src/assets/images/svg/cross.svg"
                      >
                  </div>
              </div>
          </a>
        </dt>
        <dd
            :id="'accordion' + id"
            :class="['accordion-content', 'accordionItem', collapsed ? 'is-collapsed' : 'is-expanded', !collapsed ? 'animateIn' : '']"
            :aria-hidden="collapsed.toString()"
        >
            <div class="accordion-grades">
                <div class="accordion-grades-create">
                    <material-input
                        class="accordion-grades-create_input"
                        label="Название"
                        v-model="gradeItem"
                    />
                    <button
                        class="accordion-grades-create_button"
                        @click="createGradeItem"
                    >
                        Создать навык
                    </button>
                </div>
                <div
                    v-if="filteredGradeItems && filteredGradeItems.length"
                    class="accordion-grades-list"
                >
                    <div
                        v-for="filteredItem in filteredGradeItems"
                        :key="filteredItem.id"
                        class="accordion-grades-list_item"
                    >
                        <div v-if="updatingItemId !== filteredItem.id" class="accordion-grades-list_item-text">
                            {{ filteredItem.title }}
                        </div>
                        <input
                            v-else
                            type="text"
                            v-model="updatingItem"
                            class="ghost-input"
                            placeholder="Введите новое название навыка"
                            required
                            autofocus
                        >
                        <div v-if="updatingItemId !== filteredItem.id" class="accordion-grades-list_item-icons">
                            <img
                                @click="updateGradeItem(filteredItem.id)"
                                class="icon-update"
                                src="/src/assets/images/svg/pen.svg"
                            >
                            <img
                                @click="deleteGradeItem(filteredItem.id)"
                                class="icon-delete"
                                src="/src/assets/images/svg/cross.svg"
                            >
                        </div>
                        <div v-else class="accordion-grades-list_item-icons">
                            <img
                                @click="acceptUpdateItem(filteredItem.id)"
                                class="icon-update"
                                src="/src/assets/images/svg/accept.svg"
                            >
                            <img
                                @click="cancelUpdateItem(filteredItem.id)"
                                class="icon-delete"
                                src="/src/assets/images/svg/cross.svg"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </dd>
      </dl>
    </div>
</template>

<script>
import MaterialInput from "../../ui_elements/materialInput.vue";
import {mapGetters} from "vuex";

export default {
  name: 'accordeonCompetenceItem',
    components: {
        MaterialInput
    },
  props: {
    id: {
      type: Number,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    content: {
      type: String,
      required: true,
      default: ''
    },
    collapsed: {
      type: Boolean,
      default: true,
    }
  },
  data() {
      return {
          gradeItem: '',
          updatingItemId: '',
          updatingItem: '',
          onUpdate: false,
          updatingGrade: '',
      }
  },
    methods: {
      toggleAccordion() {
          if (this.onUpdate) return
          this.$emit('update:collapsed', !this.collapsed);
      },
      async deleteGrade() {
          await this.$store.dispatch('fetchDeleteGrade', this.id)
      },
      async deleteGradeItem(id) {
          await this.$store.dispatch('fetchDeleteGradeItem', { id, parentId: this.id });
      },
      async createGradeItem() {
          if (this.gradeItem.trim()) {
            let data = {
                title: this.gradeItem,
                id: this.id
            }
            await this.$store.dispatch('fetchCreateGradeItem', data)
        }
      },
      updateGrade() {
          this.onUpdate = !this.onUpdate
      },
      updateGradeItem(id) {
          this.updatingItem = ''
          this.updatingItemId = id
      },
      async acceptUpdateItem(id) {
          let data = {
              id,
              title: this.updatingItem,
              parentId: this.id,
          }
          await this.$store.dispatch('fetchUpdateGradeItem', data)
          this.cancelUpdateItem()
      },
      async acceptUpdateGrade() {
          let data = {
              id: this.id,
              title: this.updatingGrade,
          }
          await this.$store.dispatch('fetchUpdateGrade', data)
          this.updateGrade()
      },
      cancelUpdateItem() {
          this.updatingItemId = ''
      },
      async getGradeItemsList() {
        let data = {
            id: this.id
        }
        this.$store.dispatch('fetchGradeItems', data)
      }
  },
    computed: {
      ...mapGetters(['getGradeItems']),
        filteredGradeItems() {
            let result = this.getGradeItems[this.id]
            if (Array.isArray(result)) {
                result = result.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                    return 0;
                })
            }
            return result
        }
    },
    watch: {
      async collapsed(newValue) {
          if (!newValue) {
              await this.getGradeItemsList()
          }
      }
    }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing:border-box;
}
@import url(https://fonts.googleapis.com/css?family=Lato:400,700);
body {

  font-family:'Lato';
}
.icon-update {
    cursor: pointer;
    margin-right: 16px;
}

.icon-delete {
    cursor: pointer;
}

.ghost-input {
    display: block;
    font-weight: 300;
    width: 100%;
    border: 0;
    outline: none;
    color: #fff;
    box-sizing: border-box;
    padding: 5px 0;
    margin-right: 30px;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    border-bottom:1px solid #fff;

    &::placeholder {
        color: #fff;
    }
}

.heading-primary {
  font-size:2em;
  padding:2em;
  text-align:center;
}
.accordion dl,
.accordion-list {
  border:1px solid #ddd;
&:after {
   content: "";
   display:block;
   height:1em;
   width:100%;
   background-color:darken(#38cc70, 10%);
 }
}
.accordion dd,
.accordion__panel {
  background-color:#eee;
  font-size:1em;
  line-height:1.5em;
}

.accordion {
  position:relative;
  background-color:#eee;

    &-grades {
        width: 100%;
        padding: 2em;


        &-create {
            display: flex;
            align-items: center;

            &_input {
                width: 100%;
            }

            &_button {
                height: 50px;
                width: 200px;
                margin-left: 24px;
                padding: 2px 7px;
                background-color: #38cc70;
                border: 2px;
                border-radius: 5px;
                color: #ffff;
            }
        }

        &-list {
            margin-top: 16px;

            &_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
                font-size: 18px;
                padding: 8px 16px;
                border-radius: 5px;
                background: #38cc70;
                color: #fff;

                &-icons {
                    display: flex;
                    align-items: center;
                    height: 24px;
                }
            }
        }
    }

    &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &-icons {
            display: flex;
            align-items: center;
            height: 24px;
        }
    }
}
.accordionTitle,
.accordion__Heading {
  background-color:#38cc70;
  text-align:center;
  font-weight:700;
  padding:2em;
  display:block;
  text-decoration:none;
  color:#fff;
  transition:background-color 0.5s ease-in-out;
  border-bottom:1px solid darken(#38cc70, 5%);
&:hover {
   background-color:darken(#38cc70, 10%);
 }
}
.accordionTitleActive,
.accordionTitle.is-expanded {
  background-color:darken(#38cc70, 10%);
&:before {

   transform:rotate(-225deg);
 }
}
.accordionItem {
  height:auto;
  overflow:hidden;
//SHAME: magic number to allow the accordion to animate

max-height:50em;
  transition:max-height 1s;



}

.accordionItem.is-collapsed {
  max-height:0;
}
.no-js .accordionItem.is-collapsed {
  max-height: auto;
}
.animateIn {
  animation: accordionIn 0.45s normal ease-in-out both 1;
}
.animateOut {
  animation: accordionOut 0.45s alternate ease-in-out both 1;
}
@keyframes accordionIn {
  0% {
    opacity: 0;
    transform:scale(0.9) rotateX(-60deg);
    transform-origin: 50% 0;
  }
  100% {
    opacity:1;
    transform:scale(1);
  }
}

@keyframes accordionOut {
  0% {
    opacity: 1;
    transform:scale(1);
  }
  100% {
    opacity:0;
    transform:scale(0.9) rotateX(-60deg);
  }
}
</style>