import Account from "../src/views/Account.vue";
import Categories from "../src/views/Categories.vue";
import HangMan from "../src/views/HangMan.vue";
import HomePage from "../src/views/HomePage.vue";
import IntroPage from "../src/views/IntroPage.vue";
import Level from "../src/views/Level.vue";
import ScoreBoard from "../src/views/ScoreBoard.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {path:"/", name:"intro", component:IntroPage},
    {path:"/hangman/:category/:level", name:"hangman-game", component:HangMan},
    {path:"/categories/:level", name:"categories", component:Categories},
    {path:"/levels", name:"levels", component:Level},
    {path:"/home", name:"home", component:HomePage},
    {path:"/account", name:"account", component:Account},
    {path:"/scores", name:"scores", component:ScoreBoard}
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});