<template>
    <div id="app">
        <div class="container container--flex container--content">
            <div class="column column--small">
                <StatsBlock/>
                <Button v-show="!todoEmpty" variant="link" color="danger" @click="clearCompleted">Clear completed</Button>
            </div>
            <div class="column column--large">
                <InputBlock/>
                <List :list="list"/>
            </div>
            <div class="column column--small">
                <ProgressBlock/>
                <Button v-show="!todoEmpty" variant="link" color="primary" @click="completedAll">Complete all</Button>
            </div>
        </div>
        <div class="footer">
            <div class="container container--flex">
                <Filters @change="changeFilter" :filters="filters"/>
            </div>
        </div>
    </div>
</template>

<script>

	import List from "./components/List";
	import InputBlock from "./components/InputBlock";
	import StatsBlock from "./components/StatsBlock";
	import ProgressBlock from "./components/ProgressBlock";
	import Filters from "./components/Filters";
	import Button from "./components/Button";


	export default {
		name: 'app',
		components: {
			List,
			InputBlock,
			StatsBlock,
			ProgressBlock,
			Filters,
			Button
		},
		data () {
			return {
				filters: [
					{
						id: 'all',
						text: 'All',
						active: true
					},
					{
						id: 'completed',
						text: 'Completed',
						active: false

					},
					{
						id: 'uncompleted',
						text: 'Uncompleted',
						active: false
					}
				]
			}
		},
		methods: {
			changeFilter (id) {
				this.filters = this.filters.map(filter => {
					filter.active = filter.id === id;
					return filter;
				});
			},
			filter (id) {
				if (id === 'all') {
					this.list = this.$store.state.todoList;
				} else if (id === 'completed') {
					this.list = this.$store.state.todoList.filter(todo => todo.done)
				} else if (id === 'uncompleted') {
					this.list = this.$store.state.todoList.filter(todo => !todo.done)
				}
			},
			clearCompleted () {
				this.$store.commit('clearCompleted')
			},
			completedAll () {
				this.$store.commit('completedAll')
			}
		},
		computed: {
			todoEmpty () {
				return !this.$store.state.todoList.length
			},
			currentFilter () {
				return this.filters.find(item => item.active).id
			},
			list () {
				if (this.currentFilter === 'all') {
					return this.$store.state.todoList;
				} else if (this.currentFilter === 'completed') {
					return this.$store.getters.doneTodos
				} else if (this.currentFilter === 'uncompleted') {
					return this.$store.getters.notDoneTodos
				}
			}
		},
	}
</script>

<style lang="scss">
    @import "./assets/scss/main";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-top: 60px;
        padding-bottom: 75px;

        @media (max-width: 768px) {
            padding-top: 20px;
        }
    }

    .container {
        max-width: 1170px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;

        &--flex {
            display: flex;
            @media (max-width: 768px) {
                flex-wrap: wrap;
            }
        }
        &--content {
            margin-bottom: 75px;
        }
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:  0 15px;
        &--small {
            width: 20%;
            @media (max-width: 768px) {
                width: calc(50% - 30px);
            }
        }
        &--large {
            width: 80%;
            @media (max-width: 768px) {
                width: 100%;
                margin-top: 30px;
                order: 3
            }
        }
    }

    .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: #ffffff;
    }
</style>
