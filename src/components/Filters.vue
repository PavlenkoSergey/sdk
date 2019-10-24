<template>
    <ul class="filters">
        <li class="filters__item"
            :class="{'filters__item--active': filter.active}"
            v-for="filter in filters"
            :key="filter.id"
            @click="$emit('change', filter.id)">
            {{filter.text}}
        </li>
    </ul>
</template>

<script>
	export default {
		name: "Filters",
		props: {
			filters: Array
		},
	}
</script>

<style lang="scss">
    .filters {
        display: flex;
        width: 100%;
        justify-content: center;
        padding-left: 0;

        &__item {
            display: inline;
            padding: 10px 15px;
            cursor: pointer;
            box-sizing: border-box;
            border-bottom: 2px solid transparent;

            &--active {
                color: $primary-color;
                border-color: $primary-color;
                transition: .3s;
            }
        }
    }
</style>