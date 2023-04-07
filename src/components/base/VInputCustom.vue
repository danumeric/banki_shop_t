<template>
  <input
    ref="input"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @keydown="$emit('keydown', $event)"
    type="text"
    class="v-input-c__input"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'VInputCustom',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      /* eslint-disable */
      type: String | undefined,
      required: true,
    },

    placeholder: {
      type: String || Number,
      default: null,
    },

    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input-c {
  position: relative;

  &__input {
    border: 1px solid #e1e1e1;
    border-right: none;
    background: #f6f3f3;
    padding: 1em 1.14em;
    width: 100%;
    height: 100%;
    color: #343030;
    font-size: 0.875rem;
    line-height: 150%;
    @media (max-width: 958px) {
      height: 40px;
    }
    &:focus,
    &:active {
      outline: none;
      border: 1px solid #b5b5b5;
      border-right: none;
    }

    &::placeholder {
      color: #9f9f9f;
    }
  }

  &_w {
    width: v-bind(width);
  }

  &_h {
    height: v-bind(height);
  }
}
</style>
