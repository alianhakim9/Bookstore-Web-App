<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>All Category</v-subheader>
      <v-layout row wrap>
        <v-flex v-for="category in categories" xs6 :key="category.id">
          <v-card :to="'/category/' + category.slug">
            <v-img
              v-if="category.image"
              :src="getImage('/categories/' + category.image)"
              height="150px"
            >
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span
                      class="title white--text text-block"
                      v-text="category.name"
                    ></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <template>
      <div class="text-xs-center">
        <!-- Kode untuk link paging halaman -->
        <v-pagination
          v-model="page"
          @input="go"
          :length="lengthPage"
          :total-visible="4"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      page: 0,
      lengthPage: 0,
    };
  },
  methods: {
    getImage(image) {
      if (image != null && image.length > 0) {
        return process.env.VUE_APP_BACKEND_URL + "images" + image;
      }
      return process.env.VUE_APP_BACKEND_URL + "/images/unavailable.jpg";
    },
    go() {
      let url = "/categories";
      if (this.page > 0) {
        url = `/categories?page=${this.page}`;
      }
      this.axios
        .get(url)
        .then((response) => {
          let response_data = response.data;
          let categories = response_data.data;
          this.lengthPage = response.data.data.last_page;
          this.categories = categories.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  created() {
    this.go();
  },
};
</script>


<style scope>
.text-block {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: black;
  padding-left: 5px;
  padding-right: 10px;
  opacity: 0.7;
  width: 100%;
}
</style>