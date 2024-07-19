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
                    <img src="https://cdn.vox-cdn.com/thumbor/pQ1cPtxLW3aZ6veWX02K94iMQM0=/0x0:1920x1080/1400x1400/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/23606383/ffxviclive.png" />
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
                    class="route-link-item hover:text-primary hover:bg-slate-100" 
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
                        @click="navItem.collapse = !navItem.collapse"
                        class="w-full route-link-item" 
                        :class="{
                            'justify-center' : isClosed, 
                            'route-link-item-active' : !(navItem.collapse) 
                        }"
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
                                class="route-link-item text-sm hover:text-primary hover:bg-slate-100"
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
    @apply flex items-center p-2 rounded space-x-4 transition-all;
}

.route-link-item-active {
    @apply text-white bg-primary font-medium;
}
</style>