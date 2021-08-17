<template>
<Carousel :value="items" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="true" :autoplayInterval="3000">
    <template #header>
        <h1>Recently added clans</h1>
    </template>
    <template #item="slotProps">
        <div class="carousel">
            <img :src="slotProps.data.imageURL" alt="carousel-clan-header" class="carousel-clan-header"/>
            <h2>{{slotProps.data.name}}</h2>
            <p>{{slotProps.data.description}}</p>
        </div>
    </template>
</Carousel>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props: ["item"],
    setup() {
        const items =  ref([
            {name: "Want Revolution", description: "Strongest clan amongest others", imageURL: "https://i.ytimg.com/vi/o2IJaj3nUmU/maxresdefault.jpg"},
            {name: "AnR", description: "No data", imageURL: "https://i.ytimg.com/vi/YMY3-JnLQ4w/maxresdefault.jpg"},
            {name: "Sol", description: "Founded by Arapi", imageURL: "https://i.ytimg.com/vi/W44mCO9ztxM/maxresdefault.jpg"},
            {name: "Last stand", description: "Been led by thicccc rich gorilla.", imageURL: "https://i.ytimg.com/vi/Qv1N2O3LQdg/maxresdefault.jpg"},
        ])

        const responsiveOptions = [
			{
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 1
			},
			{
				breakpoint: '600px',
				numVisible: 2,
				numScroll: 1
			},
			{
				breakpoint: '480px',
				numVisible: 1,
				numScroll: 1
			}
		]

        return {items, responsiveOptions}
    },

}
</script>

<style>
    .carousel-clan-header {
        width: 50%;
        object-fit: cover;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }
    .carousel {
        padding: 2rem 0;
        border: 1px solid #3e4a5c;
        border-radius: 3px;
        margin: .3rem;
    }
</style>