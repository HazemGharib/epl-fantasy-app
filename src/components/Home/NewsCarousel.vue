<template>
  <v-carousel
    max="500"
    height="auto"
    cycle
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item :href="article.link" v-for="(article, i) in news" :key="i">
      <template>
        <div>
          <v-img max-height="600" aspect-ratio="2" :src="article.image" />

          <v-fade-transition>
            <v-overlay absolute color="#37003c" opacity="0.7">
              <div class="px-8 mx-16">
                <v-row>
                  <v-chip
                    class="mb-8 carousel-tag darken-3"
                    color="purple"
                    small
                    label
                    dark
                  >
                    {{ article.tag }}
                  </v-chip>
                </v-row>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="carousel-title">{{ article.title }}</div>
                </v-row>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="mt-16 carousel-desc">
                    {{ article.description }}
                  </div>
                </v-row>
              </div>
            </v-overlay>
          </v-fade-transition>
        </div>
      </template>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "NewsCarousel",
  props: {
    news: {
      required: true
    }
  }
};
</script>

<style scoped>
.carousel-title {
  font-size: 28px;
}
.carousel-tag {
  font-size: 14px;
}
.carousel-desc {
  font-size: 16px;
}
@media screen and (max-width: 425px) {
  .carousel-title {
    font-size: 18px;
  }
  .carousel-tag {
    display: none;
  }
  .carousel-desc {
    display: none;
  }
}
@media screen and (max-width: 320px) {
  .carousel-title {
    font-size: 14px;
  }
}
</style>
