import Categories from "../src/views/Categories.vue";
import HangMan from "../src/views/HangMan.vue";
import IntroPage from "../src/views/IntroPage.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {path:"/", name:"intro", component:IntroPage},
    {path:"/hangman", name:"hangman-game", component:HangMan},
    {path:"/categories", name:"categories", component:Categories},
    /*{path:"/scoreboard", name:"scoreboard", component:ScoreBoard}*/
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});