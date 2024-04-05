<script setup>

const { logoSize } = defineProps(['logoSize']);

</script>

<template>
    <div class="">
        <span class="e" :style="{ fontSize: logoSize * 100 + '%' }">e</span>
        <span class="nutri" :style="{ fontSize: logoSize * 70 + '%' }">nutri</span>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: baseline;
}

span {
    font-family: " Work Sans", sans-serif;
    font-weight: 800;
    display: inline-block;
    line-height: 20%;
}

.e {
    color: #F8694D;
}

.nutri {
    color: #FF9C28;
}
</style>
