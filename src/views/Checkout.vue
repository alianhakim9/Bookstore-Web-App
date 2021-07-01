<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card flat>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" required append-icon="person"></v-text-field>
            <v-textarea label="Address" v-model="address" required auto-grow rows="3"></v-textarea>
            <v-text-field label="Phone" v-model="phone" required append-icon="phone"></v-text-field>
            <v-select
              v-model="province_id"
              :items="provinces"
              item-text="province"
              item-value="id"
              label="Province"
              persistent-hint
              single-line
            ></v-select>
            <v-select
              v-model="city_id"
              v-if="province_id > 0"
              :items="citiesByProvince"
              item-text="city"
              item-value="id"
              label="City"
              persistent-hint
              single-line
            ></v-select>
          </v-form>
          <v-card-actions>
            <v-btn color="success" dark @click="saveShipping">
              <v-icon>save</v-icon>&nbsp;
              Save
            </v-btn>
          </v-card-actions>
          <v-subheader>Your Shopping Cart</v-subheader>
          <div v-if="countCart > 0">
            <v-card flat>
              <v-list three v-if="countCart > 0">
                <template v-for="(item, index) in carts">
                  <v-list-item :key="'cart' + index">
                    <v-list-item-avatar>
                      <v-img :src="getImage('/books/' + item.cover)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-html="item.title"></v-list-item-title>
                      <v-list-item-subtitle>
                        Rp. {{ item.price.toLocaleString('id-ID')}}
                        ({{ item.weight }} kg)
                        <span
                          style="float:right"
                        >{{ item.quantity }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
              <v-container>
                <v-card-actions>
                  Subtotal
                  <v-spacer />
                  Rp. {{ totalPrice.toLocaleString('id-ID')}}
                </v-card-actions>
              </v-container>
            </v-card>
          </div>

          <v-subheader>Couriers</v-subheader>
          <div>
            <v-card flat>
              <v-container>
                <v-select
                  v-model="courier"
                  :items="couriers"
                  @change="getServices"
                  item-text="text"
                  item-value="id"
                  label="Courier"
                  persistent-hint
                  single-line
                ></v-select>
                <v-select
                  v-model="service"
                  v-if="courier"
                  :items="services"
                  @change="calculateBill"
                  item-text="resume"
                  item-value="service"
                  label="Courier Service"
                  persistent-hint
                  single-line
                ></v-select>

                <v-card-actions>
                  Subtotal
                  <v-spacer />
                  Rp. {{ shippingCost.toLocaleString('id-ID')}}
                </v-card-actions>
              </v-container>
            </v-card>
          </div>

          <v-subheader>Total</v-subheader>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex xs6 text-center>
                  Total Bill ({{ totalQuantity }} items
                  <div class="title">{{ totalBill.toLocaleString('id-ID')}}</div>
                </v-flex>
                <v-flex xs6 text-center>
                  <v-btn color="orange">
                    <v-icon light>attach_money</v-icon>&nbsp;Pay
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      province_id: 0,
      city_id: 0,
      courier: "",
      couriers: [],
      service: "",
      services: [],
      shippingCost: 0,
      totalBill: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      provinces: "region/provinces",
      cities: "region/cities",
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
      totalWeight: "cart/totalWeight"
    }),
    citiesByProvince() {
      let province_id = this.province_id;
      return this.cities.filter(function(city) {
        if (city.province_id == province_id) return city;
      });
    }
  },
  created() {
    this.name = this.user.name;
    this.address = this.user.address;
    this.phone = this.user.phone;
    this.city_id = this.user.city_id;
    this.province_id = this.user.province_id;
    if (this.provinces && this.provinces.length == 0) {
      this.axios.get("/provinces").then(response => {
        this.setProvinces(response.data.data);
      });
      this.axios.get("/cities").then(response => {
        this.setCities(response.data.data);
      });
    }

    if (this.couriers.length == 0) {
      this.axios.get("/couriers").then(response => {
        this.couriers = response.data.data;
      });
    }
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setProvinces: "region/setProvinces",
      setCities: "region/setCities",
      setCart: "cart/set"
    }),
    saveShipping() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("address", this.address);
      formData.set("phone", this.phone);
      formData.set("province_id", this.province_id);
      formData.set("city_id", this.city_id);
      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token
        }
      };
      this.axios
        .post("/shipping", formData, config)
        .then(response => {
          this.setAuth(response.data.data);
          this.setAlert({
            status: true,
            text: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          let responses = error.response;
          this.setAlert({
            status: true,
            text: responses.data.message,
            type: "error"
          });
        });
    },
    getServices() {
      let courier = this.courier;
      let encodedCart = JSON.stringify(this.carts);

      let formData = new FormData();
      formData.set("courier", courier);
      formData.set("carts", encodedCart);

      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token
        }
      };
      this.axios
        .post("/services", formData, config)
        .then(response => {
          let response_data = response.data;
          // jika tidak error maka data service dan cart akan di update
          if (response_data.status != "error") {
            this.services = response_data.data.services;
            this.setCart(response_data.data.safe_carts);
          }

          this.setAlert({
            status: true,
            text: response_data.message,
            color: response_data.status
          });
        })
        .catch(error => {
          let responses = error.response;
          this.setAlert({
            status: true,
            text: responses.data.message,
            color: "error"
          });
        });
    },
    calculateBill() {
      let selectedService = this.services.find(service => {
        return service.service == this.service;
      });
      this.shippingCost = selectedService.cost;
      this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost);
    },
    getImage(image) {
      if (image != null && image.length > 0) {
        return process.env.VUE_APP_BACKEND_URL + "images" + image;
      }
      return process.env.VUE_APP_BACKEND_URL + "/images/unavailable.jpg";
    }
  }
};
</script>