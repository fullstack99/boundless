<template lang="pug">
  .base-switch
    label.label-left {{labelLeft}}
    v-switch(:color="color", :label="labelRight", v-model="model", hide-details, @change="changed")
</template>

<script>
export default {
  props: ['color', 'value', 'label-left', 'label-right'],
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        this.model = newValue
      }
    }
  },
  methods: {
    changed (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
  .base-switch {
    display: flex;

    label {
      padding-right: 14px;
      color: rgba(0,0,0,.54);
      display: inline-block;
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      pointer-events: none;
      text-align: left;
      white-space: nowrap;
    }

    .input-group {
      flex: auto;
      width: auto;
    }

    .input-group label {
      padding-right: 0;
      max-width: none;
      width: auto;
    }
  }
</style>
