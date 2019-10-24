<template>
    <div class="list">
        <transition-group name="list">
            <ListItem v-for="item in list" :key="item.id" :itemData="item"/>
        </transition-group>
    </div>
</template>

<script>

	import ListItem from "./ListItem";

	export default {
		name: "List",
		props: {
			list: Array
		},
		components: {
			ListItem
		}
	}
</script>

<style lang="scss">
    .list {
        width: 100%;
        margin: 10px 0;
    }

    .list-enter-active, .list-leave-active {
        transition: all .4s;
    }

    .list-enter {
        opacity: 0;
        transform: translateY(-30px);
    }

    .list-leave-to {
        opacity: 0;
        transform: translateY(-5px);
    }
</style>