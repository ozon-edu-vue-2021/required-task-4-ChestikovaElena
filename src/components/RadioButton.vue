<template>
  <label class="radio-wrapper">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="changeHandler($event.target.value)"
    />
    <span class="radio-checkmark"></span>
    {{label}}
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: { default: "" },
    value: {
      type: String,
    }
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    }
  },
  methods: {
    changeHandler(currValue) {
      this.$emit('change', currValue);
    },
  }
}
</script>

<style scoped>
.radio-wrapper {
  display: flex;
  width: 100%;
  user-select: none;
}

</style>
