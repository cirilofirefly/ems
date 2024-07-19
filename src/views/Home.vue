<template>
    <div class="flex justify-evenly">
        <div class="dashboard-count">
            <div class="w-[50px] h-[50px] text-white bg-primary flex items-center justify-center rounded-full">
                <i class="bi bi-calendar-event"></i>
            </div>
            <div class="flex flex-col items-end">
                <p class="font-bold text-2xl">25</p>
                <p class="text-sm tracking-tight text-slate-700">Total Events</p>
            </div>
        </div>
        <div class="dashboard-count">
            <div class="w-[50px] h-[50px] text-white bg-secondary flex items-center justify-center rounded-full">
                <i class="bi bi-calendar-check"></i>
            </div>
            <div class="flex flex-col items-end">
                <p class="font-bold text-2xl">10</p>
                <p class="text-sm tracking-tight text-slate-700">Total events this month</p>
            </div>
        </div>
        <div class="dashboard-count">
            <div class="w-[50px] h-[50px] text-white bg-success flex items-center justify-center rounded-full">
                <i class="bi bi-people"></i>
            </div>
            <div class="flex flex-col items-end">
                <p class="font-bold text-2xl">1000</p>
                <p class="text-sm tracking-tight text-slate-700">Total Participants</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.dashboard-count {
    @apply min-h-[130px] w-[15rem] flex items-center justify-between shadow-md rounded-md px-4;
}
</style>