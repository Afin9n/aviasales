<template>
    <div class="avia-sales-filter">
        <h2 class="avia-sales-filter__title">Количество пересадок</h2>
        <div class="avia-sales-filter__list">
            <div
                    class="avia-sales-filter__item"
                    @click="changeAllFilters(!allFiltersActive)"
            >
                <img v-if="allFiltersActive"
                     class="avia-sales-filter__checkbox"
                     src="../static/checkbox-on.svg"
                     alt="checkbox"
                >
                <img v-else
                     class="avia-sales-filter__checkbox"
                     src="../static/checkbox-off.svg"
                     alt="checkbox"
                >
                <p class="avia-sales-filter__name">Все</p>
            </div>
            <div
                    class="avia-sales-filter__item"
                    v-for="(filter, index) in filters"
                    :key="index"
                    @click="filterTickets(filter)"
            >
                <img v-if="filter.value"
                     class="avia-sales-filter__checkbox"
                     src="../static/checkbox-on.svg"
                     alt="checkbox"
                >
                <img v-else
                     class="avia-sales-filter__checkbox"
                     src="../static/checkbox-off.svg"
                     alt="checkbox"
                >
                <p class="avia-sales-filter__name">{{ filter.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        name: "avia-sales-filter",

        computed: {
            ...mapGetters([
                'filters',
            ]),
            allFiltersActive () {
                return this.filters.every(filter => filter.value)
            }
        },

        methods: {
            filterTickets(filter) {
                filter.value = !filter.value
            },
            changeAllFilters (value) {
                this.filters.map(filter => {
                    filter.value = value
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avia-sales-filter {
        width: 23.2rem;
        height: 25.8rem;
        padding: 2rem 0 1rem;
        background: #ffffff;
        box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.1);
        border-radius: .5rem;

        @media (max-width: 768px) {
            width: 100%;
        }

        &__title {
            font-size: 1.2rem;
            padding-left: 2rem;
            text-transform: uppercase;
        }

        &__list {
            margin-top: 1rem;
        }

        &__item {
            padding: 1rem 2rem;
            display: flex;
            gap: 0 1rem;
            cursor: pointer;
            user-select: none;

            &:hover {
                background: #F1FCFF;
            }
        }

        &__name {
            font-weight: normal;
            font-size: 1.3rem;
        }
    }
</style>