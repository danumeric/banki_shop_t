<template>
  <article class="cards-gallery container">
    <h3 class="cards-gallery__title">Картины эпохи Возрождения</h3>
    <div class="cards-gallery__main">
      <CardsGalleryUnitCard
        :productInfo="product"
        v-for="product in filteredListedProducts"
        :key="product.id"
        @openDetailModal="(productId) => openDetailModal(productId)"
      />
    </div>
    <p v-if="filteredListedProducts.length === 0" class="text-h5 text-center">
      По данному запросу ничего не найдено
    </p>
    <div class="text-center">
      <v-dialog v-model="isDetailModalOpen" width="400px">
        <v-card variant="outlined">
          <v-card-title class="pa-4"
            >{{ detailProductInfo?.title }}
            <v-spacer></v-spacer>
            <v-btn icon @click="isDetailModalOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-item-group class="pa-4">
            <v-carousel hideDelimiterBackground height="200px">
              <v-carousel-item src="https://picsum.photos/200" cover></v-carousel-item>
              <v-carousel-item src="https://picsum.photos/200" cover></v-carousel-item>
              <v-carousel-item src="https://picsum.photos/200" cover></v-carousel-item>
            </v-carousel>

            <p class="caption mt-1">{{ detailProductInfo?.description }}</p>
            <v-container v-if="!detailProductInfo?.out_stock_status" class="my-1">
              <v-row noGutters justify="space-between">
                <v-col>
                  <span> Цена: </span>
                </v-col>
                <v-col>
                  <p
                    v-if="detailProductInfo?.price_sale_usd"
                    class="text-decoration-line-through text-right"
                  >
                    {{ detailProductInfo?.price_sale_usd | formattedPrice }} $
                  </p>
                  <p class="text-right">{{ detailProductInfo?.price_usd | formattedPrice }} $</p>
                </v-col>
              </v-row>
            </v-container>
            <p v-else-if="detailProductInfo?.out_stock_status" class="my-2 font-weight-bold">
              {{ detailProductInfo.out_stock_status }}
            </p>
          </v-item-group>
        </v-card>
      </v-dialog>
    </div>
  </article>
</template>

<script>
import CardsGalleryUnitCard from '@/components/cards/CardsGalleryUnitCard'
import { mapGetters } from 'vuex'

export default {
  name: 'CardsGallery',
  data() {
    return {
      isDetailModalOpen: false,
      detailProductId: {},
    }
  },
  created() {
    this.$store.dispatch('a_fetch_mock_products')
  },
  computed: {
    ...mapGetters(['g_search_filter_text', 'g_listed_products']),
    filteredListedProducts() {
      return this.g_listed_products.filter((product) =>
        product.title.toLowerCase().includes(this.g_search_filter_text)
      )
    },
    detailProductInfo() {
      return this.g_listed_products.find((product) => product.id === this.detailProductId)
    },
  },
  methods: {
    openDetailModal(productId) {
      this.detailProductId = productId
      this.isDetailModalOpen = true
    },
  },
  components: {
    CardsGalleryUnitCard,
  },
}
</script>
<style lang="scss" scoped>
.cards-gallery {
  &__title {
    margin-top: 1.875em;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 150%;
    @media (max-width: 958px) {
      margin-top: 2em;
    }
    @media (max-width: 767px) {
      margin-top: 3em;
      font-size: 1rem;
      text-align: center;
    }
  }
  &__main {
    display: grid;
    grid-template-columns: repeat(auto-fill, 280px);
    justify-content: space-between;
    gap: 2rem 0px;
    margin-top: 2.4375rem;
    @media (max-width: 767px) {
      grid-template-columns: repeat(1, 280px);
      justify-content: center;
    }
  }
}
</style>
