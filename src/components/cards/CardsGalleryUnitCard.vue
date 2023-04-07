<template>
  <div :class="{ 'unit-card_saled': productInfo.out_stock_status }" class="unit-card">
    <div @click="$emit('openDetailModal', productInfo.id)" class="unit-card__img">
      <img
        :src="require(`@/assets/temp/${productInfo.image_source_main}`)"
        :alt="productInfo.title"
      />
    </div>
    <div class="unit-card__main">
      <p @click="$emit('openDetailModal', productInfo.id)" class="unit-card__title">
        «{{ productInfo.title }}»
      </p>
      <p @click="$emit('openDetailModal', productInfo.id)" class="unit-card__title">
        {{ productInfo.author_name }}
      </p>
      <div v-if="!productInfo.out_stock_status" class="unit-card__prices-control">
        <div class="unit-card__prices">
          <p
            :class="{ 'unit-card__price_actual': !productInfo.price_sale_usd }"
            class="unit-card__price"
          >
            {{ productInfo.price_usd | formattedPrice }} $
          </p>
          <p class="unit-card__price_actual unit-card__price" v-if="productInfo.price_sale_usd">
            {{ productInfo.price_sale_usd | formattedPrice }} $
          </p>
        </div>
        <VBtnCustom :buttonStatus="buttonStatus" @click="addToCard(productInfo.id)" width="118px">{{
          isProductInCard ? 'В корзине' : 'Купить'
        }}</VBtnCustom>
      </div>
      <p v-else-if="productInfo.out_stock_status" class="unit-card__saled">
        {{ productInfo.out_stock_status }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CardsGalleryUnitCard',
  data() {
    return {
      buttonStatus: 'default',
    }
  },
  props: {
    productInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['g_product_card']),
    isProductInCard() {
      return this.g_product_card.find((pr) => pr.id === this.productInfo.id)
    },
  },
  methods: {
    ...mapMutations(['m_add_product_to_card']),

    addToCard(idProduct) {
      if (this.isProductInCard) return
      this.buttonStatus = 'loading'
      setTimeout(() => {
        this.buttonStatus = 'added'
        this.$store.commit('m_add_product_to_card', idProduct)
      }, 2000)
    },
  },
  created() {
    if (this.isProductInCard) this.buttonStatus = 'added'
  },
}
</script>

<style lang="scss" scoped>
.unit-card {
  border: 1px solid #e1e1e1;
  &_saled {
    opacity: 0.5;
  }
  &__main {
    padding: 1.25rem 1.5rem 1.5rem 1.5rem;
  }
  &__title {
    cursor: pointer;
  }

  &__img {
    cursor: pointer;
    width: 100%;
    height: 160px;
    img {
      -webkit-user-drag: none;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
    }
  }
  &__prices-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.375rem;
  }
  &__price {
    color: #a0a0a0;
    font-weight: 300;
    font-size: 0.875rem;
    text-decoration-line: line-through;
    &_actual {
      color: #343030;
      font-weight: 700;
      font-size: 1rem;
      text-decoration-line: none;
    }
  }
  &__saled {
    margin-top: 3.375em;
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>
