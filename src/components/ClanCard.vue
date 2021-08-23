<template>
    <Card>
        <template #header>
            <img alt="user header" :src="overview.eyecatchimageURL">
        </template>
        <template #title>
            {{overview.name}}
        </template>
        <template #content>
            {{overview.description}}
        </template>
    </Card>
</template>

<script>
export default {
    props: ["overview"],
    setup() {

        return {

        }
    },
}
</script>

<style>
img {
    object-fit: cover;
    height: 200px;
}
</style>