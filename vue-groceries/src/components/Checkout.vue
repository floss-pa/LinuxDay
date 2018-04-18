<template>
    <table class="ui very padded table teal">
        <thead class="full-width">
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Sub-Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in cart.items">
                <td>{{ item.name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.price | currency }}</td>
                <td>{{ item.price * item.qty | currency }}</td>
                <td class="collapsing">
                    <button class="ui button negative" @click="removeFromCart(item)">Remover</button>
                </td>
            </tr>
        </tbody>
        <tfoot class="full-width">
            <tr>
                <th></th>
                <th colspan="4">
                    <a v-link="{ path: '/shop' }" class="ui icon right floated labeled button negative" @click="removeAllFromCart">
                        <i class="icon remove"></i>Remover todos
                    </a>
                </th>
            </tr>
        </tfoot>
    </table>
    <div class="ui grid container">
        <div class="ui four grid column right aligned">
            <div class="ui list very relaxed">
                <div class="item">
                    <h1 class="header">Total {{ cart.total | currency }}</h1>
                </div>
                <div class="item">
                    <button class="ui button positive large">Pagar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../store.js'

export default {
    data() {
        return {
            cart: store.cart,
            items: store.items,
        }
    },

    methods: {
        removeFromCart(item) {
            this.cart.qty -= item.qty
            this.cart.total -= (item.price * item.qty)
            this.cart.items.splice(item, 1)

            this.items.push(item) // devolver a items
        },

        removeAllFromCart() {
            this.items.push(...this.cart.items)
            this.cart.items = []
            this.cart.qty = this.cart.total = 0
        }
    },
}
</script>
