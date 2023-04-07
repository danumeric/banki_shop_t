<template>
  <button
    class="v-btn-c"
    :class="{
      'v-btn-c_w': width,
      'v-btn-c_h': height,
      'v-btn-c_disabled': isDisabled,
      'v-btn-c_added': isAdded,
      ['v-btn-c_' + buttonStatus]: true,
    }"
    @click="
      if (!isDisabled) {
        $emit('click')
      }
    "
  >
    <v-progress-circular
      class="v-btn-c__progress"
      size="11"
      width="2"
      v-if="buttonStatus === 'loading'"
      indeterminate
      color="#F6F3F3"
    ></v-progress-circular>
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'VBtnCustom',
  props: {
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isAdded: {
      type: Boolean,
      default: false,
    },
    buttonStatus: {
      type: String,
      default: 'default',
    },
  },
}
</script>

<style lang="scss" scoped>
.v-btn-c {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: #403432;
  height: 48px;
  color: #f4f6f9;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 150%;
  user-select: none;
  text-align: center;
  @media (max-width: 958px) {
    height: 40px;
  }
  &__progress {
    position: absolute;
    left: 10px;
  }
  &:hover {
    background: #776763;
  }
  &_disabled {
    background: #c1b4b1;
  }
  &_loading {
  }
  &_added {
    background: #5b3a32;
    padding-left: 16px;
    &:hover {
      background: #5b3a32;
    }
    &::before {
      position: absolute;
      bottom: 0px;
      left: 10px;
      transform: rotate(-1.66deg);
      background: url('@/assets/ico-svg/check-in-card.svg') no-repeat center / cover;
      background-size: 15px 11px;
      width: 15px;
      height: 100%;
      content: '';
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
