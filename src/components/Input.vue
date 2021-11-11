<template>
  <div class="input-wrapper">
    <label for="id" class="input-label">{{ label }}</label>
    <input
      :class="['input', {
        'input--error': hasError,
        'input--success': hasSuccess,
      }]"
      :type="type"
      :placeholder="placeholder"
      v-mask="mask"
      v-model="value"
      @input="inputHandler($event.target.value)"
      @blur="blurHandler"
    />
    <div
      :class="['icon-wrapper', {
        'icon-wrapper--error': hasError,
        'icon-wrapper--success': hasSuccess,
      }]"
    >
      <Icon v-if="hasSuccess && showError" iconType="done" />
      <Icon v-if="hasError && showError" iconType="error" />
    </div>
    <span
      v-if="dataError && showError"
      class="error"
    >
      {{ dataError }}
    </span>
  </div>
</template>

<script>
import { VueMaskDirective } from "v-mask";
import Icon from "./Icon.vue";

export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    mask: {
      type: String,
      default: "",
    },
    dataError: {
      type: String,
      default: ""
    },
    dirty: {
      type: Boolean,
      default: false,
    }
  },
  directives: {
    mask: VueMaskDirective,
  },
  components: {
    Icon,
  },
  data() {
    return {
      value: "",
      showError: false,
    }
  },
  computed: {
    hasError() {
      return this.dataError !== ""
    },
    hasSuccess() {
      return this.dataError === "" && this.dirty && this.value !== ""
    }
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value);
    },
    blurHandler() {
      this.showError = true;
      this.$emit('blur');
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.input-label {
  margin-bottom: 6px;
  color: #9b9d9f;
  font-weight: 600;
}

.input {
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

input[type=date]::-webkit-calendar-picker-indicator {
  opacity: 0;
}

.input--error {
  border: 2px solid rgb(163, 9, 9);
}

.input--success {
  border: 2px solid rgb(4, 192, 4);
}

.input:focus {
  border: 2px solid #005bff;
}

.input--error:focus {
  border: 2px solid rgb(163, 9, 9);
}

.icon-wrapper {
  position: absolute;
  right: 5px;
  top: 30px;
}

.icon-wrapper--success {
  fill: rgb(4, 192, 4);
}

.icon-wrapper--error {
  fill: rgb(163, 9, 9);
}

.error {
  position: absolute;
  bottom: -18px;
  left: 5px;
  color: rgb(163, 9, 9);
  font-size: 12px;;
}

</style>
