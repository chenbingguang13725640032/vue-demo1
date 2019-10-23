import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/tabbar/Home.vue"
import Search from "../components/tabbar/Search.vue"
import Shopcar from "../components/tabbar/Shopcar.vue"
import Me from "../components/tabbar/Me.vue"
import Newslist from "../components/news/Newslist.vue"
import Newsinfo from "../components/news/Newsinfo.vue"
import Photoslist from "../components/photos/Photoslist.vue"
import Photosinfo from "../components/photos/Photosinfo.vue"
import Goodslist from "../components/goods/Goodslist.vue"
import Goodsinfo from "../components/goods/Goodsinfo.vue"
import Goodsdesc from "../components/goods/Goodsdesc.vue"
import Goodscomment from "../components/goods/Goodscomment.vue"

Vue.use(Router)

var router = new Router({
  mode: "hash",
  routes: [
    { path: "/", redirect: "/Home" },
    { path: "/Home", component: Home },
    { path: "/Search", component: Search },
    { path: "/Shopcar", component: Shopcar },
    { path: "/Me", component: Me },
    { path: "/Home/Newslist", component: Newslist },
    { path: "/Home/Newslist/Newsinfo/:id", component: Newsinfo },
    { path: "/Home/Photoslist", component: Photoslist },
    { path: "/Home/Photoslist/Photosinfo/:id", component: Photosinfo },
    { path: "/Home/Goodslist", component: Goodslist },
    { path: "/Home/Goodslist/Goodsinfo/:id", component: Goodsinfo },
    { path: "/Home/Goodslist/Goodsinfo/Goodsdesc/:id", component: Goodsdesc, name: "Goodsdesc" },
    { path: "/Home/Goodslist/Goodsinfo/Goodscomment/:id", component: Goodscomment, name: "Goodscomment" }
  ]
})

export default router