<template>
  <div class="input-wrapper">
    <label for="id" class="input-label">{{ label }}</label>
    <input class="input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      @input="inputHandler($event.target.value)"
    />
    <span
      v-if="errorModel"
      class="error"
    >
      {{ errorModel }}
    </span>
  </div>
</template>

<script>
import { VueMaskDirective } from "v-mask";

export default {
  name: "Input",
  props: {
    id: {
      type: String,
      required: true,
    },
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
    errorModel: {
      type: String,
      default: ""
    }
  },
  directives: {
    mask: VueMaskDirective,
  },
  data() {
    return {
      value: "",
    }
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value)
    },
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
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

.input:focus {
  border: 2px solid #005bff;
}

</style>
