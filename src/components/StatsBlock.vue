<template>
    <div class="statsTable">
        <header class="statsTable__header">Stats</header>
        <table class="statsTable__table">
            <tr>
                <th>Deals:</th>
                <td>{{$store.state.todoList.length}}</td>
            </tr>
            <tr>
                <th>Deals left:</th>
                <td>{{$store.getters.notDoneTodos.length}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
	export default {
		name: "StatsTable"
	}
</script>

<style lang="scss">
    @import "../assets/scss/mixins";

    .statsTable {
        &__header {
            @include blockHeader;
        }
        &__table {
            tr {
                border: 1px solid $disables-color;
            }
            th {
                padding-right: 20px;
                text-align: left;
            }
        }
    }

</style>