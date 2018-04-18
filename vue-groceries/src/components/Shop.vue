<template>
  <div class="ui two column grid centered">
    <div class="column">
      <div class="ui icon input fluid large">
        <input type="text" placeholder="Buscar producto" v-model="itemFiltered">
        <i class="icon search"></i>
      </div>
    </div>
  </div>
  <div class="ui segment" v-show="itemsLeftCount">
    <div class="ui items divided">
      <div class="item" v-for="item of items | filterBy itemFiltered in 'name'" track-by="id">
        <div class="content">
          <div class="header">
            <h1>{{ item.name }}</h1>
          </div>
          <div class="meta">
            <div class="ui label">
              Precio
              <div class="detail">{{ item.price | currency }}</div>
            </div>
            <div class="ui label">
              Unidad
              <div class="detail">{{ item.units }}</div>
            </div>
          </div>
          <div class="extra">
            <div class="ui three column grid">
              <div class="column right floated">
                <div class="ui action input small fluid">
                  <input type="text" v-model="item.qty">
                  <button class="ui icon button" @click="addToCart(item)">
                    <i class="icon cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import store from '../store.js'

  export default {
    data () {
      return {
        items: store.items,
        itemFiltered: '',
        cart: store.cart
      }
    },

    methods: {
      /**
       * Agregar producto al carrito
       * @param {object} item Producto seleccionado a agregar
       */
      addToCart (item) {
        this.items.splice(this.items.indexOf(item), 1)

        this.cart.qty += parseInt(item.qty)
        this.cart.total += parseFloat(item.qty * item.price)
        this.cart.items.push(item)
      }
    },

    computed: {
      itemsLeftCount () {
        return this.items.length
      }
    }
  }
</script>
