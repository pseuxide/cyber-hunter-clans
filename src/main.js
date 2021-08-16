import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config"

import "primevue/resources/themes/vela-green/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';

const app = createApp(App)
app.use(PrimeVue)
app.component("Button", Button)
app.component("Carousel", Carousel)
app.component("Avatar", Avatar)
app.component("Dialog", Dialog)
app.component("InputText", InputText)
app.component("Card", Card)

app.use(router).mount('#app')