<template>
  <header class="header">
    <div v-click-outside="() => onResize()" class="header__main container">
      <v-app-bar-nav-icon @click="isNavShow = !isNavShow" class="hidden-md-and-up mr-4" />

      <nav v-show="isNavShow" class="header__nav">
        <a href="#">Каталог</a>
        <a href="#">Доставка</a>
        <a href="#">Оплата</a>
        <a href="#">Контакты</a>
        <a href="#">О компании</a>
      </nav>
      <div v-show="isNavShow" class="header__search-block">
        <VInputCustom
          @keydown="onKeyEsc"
          :value="g_search_filter_text"
          @input="(searchFilterText) => m_update_search_filter_text(searchFilterText)"
          placeholder="Поиск по названию картины"
        />
        <VBtnCustom @click="clickSearchFilterText()" width="122px">Найти</VBtnCustom>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import VClickOutside from 'v-click-outside'

export default {
  name: 'HeaderMain',
  components: {},
  data() {
    return { isNavShow: true }
  },
  directives: {
    clickOutside: VClickOutside.directive,
  },
  computed: {
    ...mapGetters(['g_search_filter_text']),
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  },

  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    ...mapMutations(['m_update_search_filter_text']),
    onKeyEsc(e) {
      if (e.code == 'Escape') {
        this.m_update_search_filter_text('')
      }
    },
    onResize() {
      if (document.documentElement.clientWidth > 958) {
        this.isNavShow = true
        return
      }
      if (document.documentElement.clientWidth <= 958) {
        this.isNavShow = false
      }
    },
    clickSearchFilterText() {
      this.onResize()
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #e1e1e1;
  height: 97px;
  @media (max-width: 1263px) {
    height: 80px;
  }
  @media (max-width: 958px) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    background: #f6f3f3;
    height: 40px;
  }
  &__main {
    display: flex;
    align-items: center;
    height: 100%;
    @media (max-width: 958px) {
      flex-direction: column;
      align-items: flex-end;
      z-index: 2;
      background: #f6f3f3;
      height: 100%;
    }
  }
  &__nav {
    display: flex;
    flex: 1 0;

    gap: 0 48px;
    margin: 0px 0px 0px 96px;
    font-size: 0.875rem;
    @media (max-width: 1263px) {
      gap: 0 30px;
      margin: 0px 0px 0px 36px;
      background: #f6f3f3;
    }
    @media (max-width: 958px) {
      flex-direction: column;
      align-items: center;
      order: 1;
      gap: 1rem;
      padding-bottom: 1rem;
      width: 100%;
    }
  }
  &__search-input {
    width: 294px;
  }
  &__search-block {
    display: flex;
    @media (max-width: 958px) {
      align-self: center;
      background: #f6f3f3;
      padding: 1rem;
      width: 100%;
    }
  }
  &__search-button {
    font-size: 0.875rem;
  }
}
</style>
