<template>
    <div class="avia-sales">
        <avia-sales-filter />
        <div class="avia-sales__content">
            <avia-sales-sort />
            <div v-if="ticketsListToRender.length" class="avia-sales__list">
                <avia-tiket
                        v-for="(ticket, index) in ticketsListToRender"
                        :key="index"
                        :ticket="ticket"
                />
            </div>
            <div class="avia-sales__empty" v-else>
                Ни один из билетов не соответствует заданным фильтрам
            </div>
        </div>
    </div>
</template>

<script>
    import AviaSalesSort from "../components/AviaSalesSort";
    import AviaTiket from "../components/AviaTiket";
    import AviaSalesFilter from "../components/AviaSalesFilter";
    import {mapGetters} from 'vuex'

    export default {
        name: "avia-sales",

        components: {AviaSalesFilter, AviaTiket, AviaSalesSort},

        data() {
            return {
                stop: false,
                searchId: null,
                ticketsList: [],
            }
        },

        computed: {
            ...mapGetters([
                'sortBy',
                'filters',
            ]),
            sortTicketsList() {
                let filterList = this.filterTicketList
                return filterList.sort((a, b) => {
                    if (this.sortBy === 'ask-price') {
                        return a.price - b.price;
                    } else {
                        const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
                        const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);
                        return durationA - durationB;
                    }
                });
            },
            filterTicketList() {
                return this.ticketsList.filter(ticket => {
                    const activeFilters = this.filters.filter(filter => filter.value);
                    const countTransplants = activeFilters.map(filter => filter.key)
                    return ticket.segments.reduce((acc, s) => acc || countTransplants.indexOf(s.stops.length) >= 0, false);
                });
            },
            ticketsListToRender() {
                return this.sortTicketsList.slice(0, 5)
            },
        },

        created() {
            this.init()
        },

        methods: {
            async init() {
                await this.getSearchId()
                await this.getTickets()
            },
            async getSearchId() {
                let response = await fetch("https://front-test.beta.aviasales.ru/search");
                let {searchId} = await response.json();
                this.searchId = searchId
            },
            async getTickets() {
                try {
                    let response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`);
                    let {stop, tickets} = await response.json();
                    this.stop = stop
                    this.ticketsList = tickets
                    if (!this.stop) return await this.getTickets()
                } catch (e) {
                    if (!this.stop) await this.getTickets()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .avia-sales {
        display: flex;
        justify-content: center;
        gap: 2rem;

        @media (max-width: 768px) {
            flex-direction: column;
        }

        &__list {
            margin-top: 2rem;
        }

        &__content {
            width: 50rem;

            @media (max-width: 768px) {
                width: 100%;
            }
        }
        &__empty {
            padding: 2rem;
            font-size: 1.6rem;
            background: #FFFFFF;
            box-shadow: 0 0.2rem 0.8rem rgb(0 0 0 / 10%);
            border-radius: 0.5rem;
            margin-top: 2rem;
        }
    }
</style>
