<script setup>
import { ref } from 'vue';

defineProps({
    navItems: {
        type: Array,
        default: []
    }
})

const isClosed = ref(false);

const logout = () => {

}

</script>

<template>
    <div class="nav-container" :class="{ '!w-[5rem]': isClosed }">
        <div @click="isClosed = !isClosed" role="button" class="nav-collapse">
            <i :class="`bi bi-caret-${isClosed ? 'right' : 'left'}`"></i>
        </div>
        <div class="profile-container">
            <div class="avatar">
                <div class="w-12 rounded-xl">
                    <img src="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/405092892_1833533063749945_8196012846643501737_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGKQivaSF_PvMN3iOl4IbsLnh-f5AWQLYOeH5_kBZAtg_DKnNtZwMbgYhc78Yn6l81TcCV2DCaLKSMwkDp1zdUu&_nc_ohc=bP5P7msBgfUQ7kNvgEimugw&_nc_ht=scontent.fceb6-1.fna&oh=00_AYDae76JCAmhYgBrrmcYOTTkmHTaS13Qbnj4pySaqig8Eg&oe=66954456" />
                </div>
            </div>
            <div v-if="!isClosed" class="space-y-0">
                <h1 class="font-medium">Cirilo Bucatcat</h1>
                <p class="text-xs">Administrator</p>
            </div>
        </div>
        <ul class="mt-8 px-2 space-y-1">
            <li v-for="(navItem, index) in navItems" :key="index" :title="navItem.name">
                <router-link
                    v-if="navItem.route" 
                    class="route-link-item" 
                    :class="{'justify-center' : isClosed}" 
                    :to="navItem.route" 
                    activeClass="route-link-item-active"
                    exactActiveClass="route-link-item-active"
                >
                    <i :class="`bi bi-${navItem.icon}`"></i>
                    <p v-if="!isClosed">{{ navItem.name }}</p>
                </router-link>
                <div v-else>
                    <button
                        class="w-full route-link-item" 
                        :class="{
                            'justify-center' : isClosed, 
                            'route-link-item-active' : !navItem.collapse }
                        "
                        @click="() => navItem.collapse = !navItem.collapse" 
                    >
                        <i :class="`bi bi-${navItem.icon}`"></i>
                        <p v-if="!isClosed">{{ navItem.name }}</p>
                    </button>
                    <ul 
                        v-if="!navItem.collapse" 
                        :class="{ 
                            'ml-4' : !isClosed, 
                            'flex flex-col items-center' : isClosed
                        }"
                    >
                        <li v-for="(subRoute, index) in navItem.subRoutes" :key="index" :title="subRoute.name">
                            <router-link
                                class="route-link-item text-sm"
                                :to="subRoute.route"
                                activeClass="text-primary text-sm font-semibold"
                            >
                                <i :class="`bi bi-${subRoute.icon}`"></i>
                                <p v-if="!isClosed">{{ subRoute.name }}</p>
                            </router-link>
                        </li>
                    </ul>
                    
                </div>
            </li>
        </ul>
        <div class="mt-auto">
            <div class="divider mb-0"></div>
            <button 
                @click="logout" 
                class="btn w-full flex" 
                :class="`justify-${isClosed ? 'center' : 'start'}`"
            >
                <i class="bi bi-box-arrow-right"></i>
                <p v-if="!isClosed">Logout</p>
            </button>
        </div>
    </div>
</template>

<style scoped>
.nav-container {
    @apply relative h-screen flex flex-col shadow-md w-[20rem] h-screen p-2 transition-all;
}

.nav-collapse {
    @apply flex items-center justify-center w-[24px] h-[24px] text-white -right-4 top-7 absolute bg-primary rounded-full;
}

.profile-container {
    @apply flex items-center mt-2 ml-2 space-x-3;
}

.route-link-item {
    @apply flex items-center p-2 rounded space-x-4;
}

.route-link-item-active {
    @apply text-white bg-primary font-medium;
}
</style>