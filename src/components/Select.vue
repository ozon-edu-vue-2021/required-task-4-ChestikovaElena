<template>
  <div>
    <div class="selector" v-click-outside="hideDropdown">
        <label for="selector-input" class="input-label"> {{ label }} </label>
        <input
          v-model.trim="searchValue"
          class="selector-input"
          id="selector-input"
          :placeholder="placeholder"
          @focus="focusHandler"
        >
        <div class="icon-wrapper">
          <Icon iconType="arrow" />
        </div>
        <div
          v-if="isDropdownOpen"
          class="selector___dropdown"
        >
          <ul
            v-if="filteredValues && filteredValues.length"
            class="selector-list"
          >
            <li
              v-for="item in filteredValues"
              :key="item.id"
              class="selector-item"
              @click="clickHandler(item[field])"
            >
              {{item[field]}}
            </li>
          </ul>
          <div v-else class="empty">
            Ничего не найдено
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import Icon from "./Icon.vue";
import _ from "lodash";

export default {
  name: "Select",
  directives: {
    ClickOutside,
  },
  components: {
    Icon,
  },
  props: {
    values: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedValue: "",
      searchValue: "",
      filteredValues: null,
      debounceSearchValues: null,
    };
  },
  created() {
    this.getValues(this.searchValue);
    this.debounceSearchValues = _.debounce(this.getValues, 1000);
  },
  watch: {
    searchValue(newValue) {
      this.debounceSearchValues(newValue);
    },
  },
  methods: {
    focusHandler() {
      this.searchValue = "";
      this.isDropdownOpen = true;
    },
    hideDropdown() {
      return this.isDropdownOpen = false;
    },
    clickHandler(currValue) {
      this.$emit('selected', currValue);
      this.selectedValue = currValue;
      this.isDropdownOpen = false;
      this.searchValue = currValue;
    },
    getValues(searchValue) {
      console.log("FETCH SKILLS EVENT: GET SKILLS FROM API", searchValue);

      this.filteredValues = this.values.filter(value =>
        value[this.field].toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  }
}
</script>

<style scoped>
.selector {
  display: flex;
  flex-direction: column;
  position: relative;
}

.selector-input {
  padding: 8px;
  border: 2px solid #b3bcc5;
  border-radius: 6px;
  outline: none;
  font-size: 16px;
  color: #001a34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-label {
  margin-bottom: 6px;
  color: #9b9d9f;
  font-weight: 600;
}

.selector-input:focus {
  border: 2px solid #005bff;
}

.selector-list {
  padding-left: 10px;
  list-style: none;
  position: absolute;
  z-index: 999;
  background-color: #fff;
}

.selector-item {
  padding: 5px;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
}

.selector-item:hover {
  border-color: #9b9d9f;
}

.icon-wrapper {
  position: absolute;
  right: 0;
  top: 30px;
}

.icon-wrapper {
  fill: #9b9d9f;
}

</style>
