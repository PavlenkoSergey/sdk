<template>
    <div class="inputBlock">
        <div class="inputBlock__item">
            <input class="inputBlock__input"
                   id="text"
                   type="text"
                   ref="input"
                   v-model="value"
                   @keypress.enter="add"
                   :placeholder="placeholderText">
            <label for="text" class="inputBlock__label">{{placeholderText}}</label>
            <span class="inputBlock__inputBorder"></span>
        </div>
        <Button @click="add" color="primary">Add to list</Button>
    </div>
</template>

<script>
	import Button from "./Button";

	export default {
		name: "InputBlock",
		components: {
			Button
		},
		data () {
			return {
				value: '',
				placeholderText: 'Input your deal'
			}
		},
		methods: {
			add () {
				if (this.value) {
					this.$store.commit('add', { text: this.value });
					this.value = '';
				}

				this.$refs.input.focus();
			}
		}
	}
</script>

<style lang="scss">

    .inputBlock {
        display: flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        @media (max-width: 768px) {
            flex-wrap: wrap;

            .btn {
                margin-top: 20px;
                margin-left: auto;
            }
        }
        width: 100%;
        padding-top: 20px;

        &__item {
            display: inline-block;
            position: relative;
            margin-right: 20px;
            width: 100%;
        }

        &__label {
            position: absolute;
            left: 0;
            width: 100%;
            top: 9px;
            transition: 0.4s;
            z-index: -1;
            color: transparent;
        }

        &__input {
            width: 100%;
            padding: 7px 0;
            border: 0;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            outline: none;
            background-color: transparent;

            &::-webkit-input-placeholder {
                transition: 1s;
            }

            &:focus {

                &::-webkit-input-placeholder {
                    color: transparent;
                    transition: 0s;
                }

                & ~ .inputBlock__inputBorder {
                    width: 100%;
                    transition: 0.4s;
                }

                & ~ .inputBlock__label {
                    top: -16px;
                    font-size: 12px;
                    color: $primary-color;
                    transition: 0.4s;
                }
            }
        }

        &__inputBorder {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: $primary-color;
            transition: 0.4s;
        }


    }
</style>