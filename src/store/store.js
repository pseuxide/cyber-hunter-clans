import {createStore} from "vuex"

export default createStore({
    state: {
        bClanlistLoaded: false,
        clanlistData: [],
        bDashboardLoaded: false,
        dashboardData: [],
    },
    getters: {
    },
    mutations: {
        setClanlistData(state, clandata) {
            state.clanlistData = clandata
            state.bClanlistLoaded = true
        },
        setDashboardData(state, clandata) {
            state.dashboardData = clandata
            state.bDashboardLoaded = true
        }
    },
})