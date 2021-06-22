<template>
  <div class="about">
    <v-container>
      <v-subheader class="title"></v-subheader>
      <v-img v-if="book.cover" :src="getImage('/books/' + book.cover)" height="200px"></v-img>
      <v-subheader></v-subheader>
      <table class="v-data-table">
        <tbody>
          <tr>
            <th class="text-left">Author</th>
            <td>{{ book.author }}</td>
          </tr>
          <tr>
            <th class="text-left">Publisher</th>
            <td>{{ book.publisher }}</td>
          </tr>
          <tr>
            <th class="text-left">Price</th>
            <td v-if="book.price">Rp. {{ book.price.toLocaleString('id-ID') }}</td>
          </tr>
          <tr>
            <th class="text-left">Weight</th>
            <td>{{ book.weight }} kg</td>
          </tr>
          <tr>
            <th class="text-left">Stock</th>
            <td>{{ book.stock }}</td>
          </tr>
          <tr>
            <th class="text-left">Categories</th>
            <td>
              <template v-for="category in book.categories" v-key="category.id">{{ category.name}}</template>
            </td>
          </tr>
        </tbody>
      </table>
      <v-subheader>Description</v-subheader>
      <p class="body-2">{{ book.description }}</p>
      <div style="position:relative">
        <v-btn block color="success" @click="buy" :disable="book.stock == 0">
          <v-icon>save_alt</v-icon>&nbsp;BUY
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    getImage(image) {
      if (image != null && image.length > 0) {
        return process.env.VUE_APP_BACKEND_URL + "images" + image;
      }
      return process.env.VUE_APP_BACKEND_URL + "/images/unavailable.jpg";
    },
    ...mapActions({
      addCart: "cart/add",
      setAlert: "alert/set"
    }),
    buy() {
      this.addCart(this.book);
      this.setAlert({
        status: true,
        text: "Added to cart",
        type: "success"
      });
    }
  },
  created() {
    let slug = this.$route.params.slug;
    this.axios
      .get("/books/slug/" + slug)
      .then(response => {
        let book = response.data.data;
        this.book = book;
      })
      .catch(error => {
        let responses = error.response;
        console.log(responses);
      });
  }
};
</script>