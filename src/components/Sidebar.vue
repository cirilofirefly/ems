<script setup>
defineProps({
    navItems: {
        type: Array,
        default: []
    }
})

</script>

<template>
    <div class="nav-container">
        <img src="" alt="">
        <ul>
            <li v-for="(navItem, index) in navItems" :key="index">
                <router-link v-if="navItem.route" :to="navItem.route">
                    <i :class="`bi bi-${navItem.icon}`"></i>
                    {{ navItem.name }}
                </router-link>
                <div v-else>
                    <button @click="navItem.collapse = !navItem.collapse" class="cursor-pointer">
                        <i :class="`bi bi-${navItem.icon}`"></i>
                        {{ navItem.name }}
                    </button>
                    <div v-if="navItem.collapse" class="ml-4">
                        <router-link 
                            v-for="(subRoute, index) in navItem.subRoutes" 
                            :key="index" 
                            :to="subRoute.route"
                        >
                            <p>{{ subRoute.name }}</p>
                        </router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.nav-container {
    @apply shadow-md w-[20rem] h-screen mr-4;
}
</style>