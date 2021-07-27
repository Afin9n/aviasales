<template>
    <div class="avia-sales-sort">
        <button
                class="avia-sales-sort__btn"
                :class="{ 'avia-sales-sort__btn--active': isPriceSort }"
                @click="sortsTicket('ask-price')"
        >
            Самый дешевый
        </button>
        <button
                class="avia-sales-sort__btn"
                :class="{ 'avia-sales-sort__btn--active': !isPriceSort }"
                @click="sortsTicket('ask-time')"
        >
            Самый быстрый
        </button>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "avia-sales-sort",

        data () {
          return {
            sortingType: 'ask-price'
          }
        },
        computed: {
            ...mapGetters([
                'sortBy',
            ]),
            isPriceSort () {
                return this.sortBy === 'ask-price'
            }
        },

        methods: {
            sortsTicket (sortBy) {
                this.$store.dispatch('setSort', sortBy)
            }
        },

      mounted() {
          this.sortingType = this.sortBy
      }
    }
</script>

<style lang="scss" scoped>
    .avia-sales-sort {
        width: 100%;

        &__btn {
            height: 50px;
            width: 50%;
            text-transform: uppercase;
            font-size: 1.2rem;
            background: #ffffff;
            color: #4A4A4A;

            &--active {
                background: #2196F3;
                color: #ffffff;
            }

            &:first-child {
                border-top-left-radius: .5rem;
                border-bottom-left-radius: .5rem;
            }

            &:last-child {
                border-top-right-radius: .5rem;
                border-bottom-right-radius: .5rem;
            }
        }
    }
</style>
