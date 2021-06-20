"use strict"
import Vue from 'vue';

const Helper = {
    install(vue) {
        vue.prototype.appName = process.env.VUE_APP_NAME
        vue.prototype.getImage = function (image) {
            if (image != null && image.length > 0) {
                return process.env.VUE_APP_BACKEND_URL + "/images" + image;
            }
            return "/img/notfound.png"
        }
    }
}

Vue.use(Helper);