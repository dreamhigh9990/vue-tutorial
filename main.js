var app = new Vue({
    el: '#app',
    data: {
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
    },
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
        printBrandAndProduct() {
            if (this.onSale) {
                return this.brand + ' ' + this.product
            }
            return ""
        }
    }
})