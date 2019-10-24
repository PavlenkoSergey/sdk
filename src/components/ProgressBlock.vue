<template>
    <div class="progressBlock">
        <header class="progressBlock__header">Progress</header>
        <div class="progressBlock__container" :data-percentage="percentage">
            <svg id="svg" width="150" height="150" viewPort="0 0 75 75" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
                <circle :r="radius" cx="75" cy="75" fill="transparent" :stroke-dasharray="strokeDasharray"
                        stroke-dashoffset="0"></circle>
                <circle id="bar" :r="radius" cx="75" cy="75" fill="transparent" :stroke-dasharray="strokeDasharray"
                        :stroke-dashoffset="strokeDashOffset"></circle>
            </svg>
        </div>
    </div>
</template>

<script>

	export default {
		name: "ProgressBlock",
		data () {
			return {
				radius: 65,
			}
		},
		computed: {
			strokeDashOffset () {
				return ((100 - this.percentage) / 100) * this.strokeDasharray
			},
			strokeDasharray () {
				return Math.PI * (this.radius * 2)
			},
			percentage () {
				let listCount = this.$store.state.todoList.length,
						done = this.$store.getters.doneTodosCount;

				return listCount ? Math.round(done / listCount * 100) : 0;
			}
		}
	}
</script>

<style lang="scss">
    @import "../assets/scss/mixins";

    .progressBlock {
        &__header {
            @include blockHeader;
        }

        &__container {
            display: flex;
            height: 150px;
            width: 150px;
            border-radius: 100%;
            position: relative;

            &:after {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                content: attr(data-percentage) "%";
                border-radius: 100%;
                line-height: 160px;
                font-size: 2em;
            }

            #svg circle {
                /*stroke-dashoffset: 0;*/
                transition: stroke-dashoffset .4s linear;
                stroke: $disables-color;
                stroke-width: 1em;
            }

            #svg #bar {
                stroke: $primary-color;
            }
        }
    }


</style>