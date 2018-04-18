<template>
  <div class="ui menu borderless fixed top large">
    <div class="ui container">
      <div class="header item">VueGroceries</div>
      <div class="item right">
        <a class="ui label big teal" :class="{ disabled: !cartQtyCount }" v-link="cartQtyCount ? '/checkout': null">
          <i class="icon cart"></i>{{ cartQtyCount }}
        </a>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="ui text container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  body {
    background-color: #DCDCDC;
  }

  .content {
    padding-top: 7rem;
  }
</style>

<script>
import products from '../data/products.js'
import store from '../store.js'

export default {
  replace: false, // no remplazar punto de montaje con `template`

  /**
   * Objeto data unicamente de intancia VM
   * @return {Object}
   */
  data () {
    return {
      products: products,
      ...store // operador spread ES2015
    }
  },

  /**
   * Boostrapping de instancia VM
   * @return void
   */
  created () {
    // productos con su stock inicial
    var stocks = this.products.map((product) => {
      let _product = {}

      // `_product` es replica de `product`
      // extendemos _product agregando propiedad `qty`
      Object.assign(_product, product)
      Object.defineProperty(_product, 'qty', { value: 1, writable: true, enumerable: true, configurable: true })

      return _product // devolver nuevo objeto
    })

    for (let stock of stocks) { this.items.push(stock) } // por cada `stock` empujar a `items`
  },

  /**
   * Propiedad computacion de instancia VM
   * @type {Object}
   */
  computed: {
    cartQtyCount: {
      /**
       * Funcion getter
       * @return {Numeric} Cantidad de item individual en carrito
       */
      get () { return this.cart.qty } }
  }
}
</script>
