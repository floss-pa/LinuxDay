import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * App
 *
 * Bootstrap & punto de anclaje a las vistas dinamicas, <view-router/>
 */
import App from './components/App.vue'

/**
 * Shop
 *
 * Vista y acciones de lista de productos
 */
import Shop from './components/Shop.vue'
import Checkout from './components/Checkout.vue'

Vue.use(VueRouter)

export const router = new VueRouter()

router.map({
  '/shop': { component: Shop },
  '/checkout': { component: Checkout }
})

router.redirect({
  '*': '/shop'
})

router.start(App, 'body')
