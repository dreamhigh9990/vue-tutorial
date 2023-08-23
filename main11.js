var eventBus = new Vue()

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
                    <!-- <p>Cart({{ cart }})</p> -->
                </div>

                <product-tabs :reviews="reviews"></product-tabs>

                

            </div>
        </div>
    `,
    data() {
        return {
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
            reviews: [],
            // cart: 0,

            description: 'Best selling',
            link: 'https://www.google.com/',
            onSale: true,
        }
    },
    methods: {
        addToCart: function () {
            // this.$emit('add-to-cart')
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            // this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        // updateProduct(variantImage) {
        //     this.image = variantImage
        // }
        // addReview(productReview) {
        //     this.reviews.push(productReview)
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{error}}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
        <span class="tab" 
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab">
            {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a Review'"
            ></product-review>
      </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        // cart: 0,
        cart: [],
    },
    methods: {
        // updateCart() {
        //     this.cart.push(id)
        // }
        updateCart(id) {
            this.cart.push(id)
        }
    }
})