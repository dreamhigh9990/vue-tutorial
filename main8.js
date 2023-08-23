Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <a v-bind:href="link">
                    <img v-bind:src="image">
                </a>
            </div>
            <div class="product-info">
                <!-- <h1>{{ brand }} {{ product }}</h1> -->
                <h1>{{ title }}</h1>
                <h6>{{ printBrandAndProduct }}</h6>
                <h5>{{ description }}</h5>

                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>User is premium: {{ premium }}</p>

                <p :class="{ textDecoration: !inStock}">Out of Stock</p>

                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <p v-show="inventory > 10">In Stock</p>

                <span v-show="onSale">On Sale!</span>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <!-- <div v-for="variant in variants" 
                    :key="variant.variantId" 
                    class="color-box" 
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(variant.variantImage)">
                    <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p>
                </div> -->

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId" 
                    class="color-box" 
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                    <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                </div>

                <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
                <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}"
                    >Add to Cart</button>

                <div class="cart">
                    <p>Cart({{ cart }})</p>
                </div>

            </div>
        </div>
    `,
    data() {
       return  {
            brand: 'Vue Mastery',
            product: 'Socks',
            // image: './assets/vmSocks-green.jpg',
            selectedVariant: 0,
            // inStock: true,
            inventory: 1,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 0
                }
            ],
            cart: 0,

            description: 'Best selling',
            link: 'https://www.google.com/',
            onSale: true,
        }
    } ,
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
        // updateProduct(variantImage) {
        //     this.image = variantImage
        // }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        },
        printBrandAndProduct() {
            if (this.onSale) {
                return this.brand + ' ' + this.product
            }
            return ""
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})