<template>
    <div class="avia-ticket">
        <div class="avia-ticket__details">
            <h3 class="avia-ticket__price">{{ formatPrice(ticket.price) }} Р</h3>
            <img class="avia-ticket__logo" :src="`https://pics.avs.io/99/36/${ticket.carrier}.png`" alt="avia-brand">
        </div>
        <div
            class="avia-ticket__way"
            v-for="(segment, index) in ticket.segments"
            :key="index"
        >
            <div class="avia-ticket__time">
                <div class="avia-ticket__label">{{ segment.origin }} – {{ segment.destination }}</div>
                <div class="avia-ticket__value">{{ formatDate(segment.date, segment.duration) }}</div>
            </div>
            <div class="avia-ticket__time-spend">
                <div class="avia-ticket__label">В пути</div>
                <div class="avia-ticket__value">{{ formatDuration(segment.duration) }}</div>
            </div>
            <div class="avia-ticket__transplants">
                <div class="avia-ticket__label">{{ transplantsCount(segment.stops) }}</div>
                <div class="avia-ticket__value">{{ transplantsNames(segment.stops) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "avia-tiket",
        props: {
            ticket: {
                type: Object,
                required: true
            }
        },
        methods: {
            transplantsCount (stops) {
                switch (stops.length) {
                    case 0: return 'Без пересадок'
                    case 1: return '1 пересадка'
                    case 2: return '2 пересадки'
                    case 3: return '3 пересадки'
                }
            },
            transplantsNames (stops) {
                return stops.length ? stops.join(', ') : '-'
            },
            formatPrice(value) {
                return (value/1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            },
            formatDuration (minute) {
                let hours = Math.floor(minute / 60);
                let minutes = minute % 60;
                return `${hours}ч ${minutes}м`
            },
            formatDate (date, duration) {
                let dateStart = new Date(Date.parse(date));
                let dateFinish = new Date(dateStart.getTime());
                dateFinish.setMinutes(dateFinish.getMinutes() + duration);
                let startHours = this.formatTwoDigit(dateStart.getHours());
                let startMinutes = this.formatTwoDigit(dateStart.getMinutes());
                let finnishHours = this.formatTwoDigit(dateFinish.getHours());
                let finnishMinutes = this.formatTwoDigit(dateFinish.getMinutes());
                return `${startHours}:${startMinutes} - ${finnishHours}:${finnishMinutes}`
            },
            formatTwoDigit (value) {
                const str = String(value);
                return str.length === 1 ? ("0" + str) : str;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avia-ticket {
        padding: 2rem;
        background: #FFFFFF;
        box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.1);
        border-radius: .5rem;
        margin-bottom: 2rem;

        &__details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
        }

        &__price {
            font-size: 2.4rem;
            color: #2196F3;
        }

        &__way {
            display: flex;
            flex: 1 0 0;
            margin-bottom: 1rem;
        }

        &__time, &__time-spend, &__transplants {
            flex: 1 0 0;
        }

        &__label {
            font-size: 1.2rem;
            color: #A0B0B9;
            text-transform: uppercase;
        }

        &__value {
            font-size: 1.4rem;
            color: #4A4A4A;
        }
    }
</style>