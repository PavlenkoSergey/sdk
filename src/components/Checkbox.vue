<template>
    <label class="checkbox">
        <input class="checkbox__input"
               type="checkbox"
               value="1"
               :checked="value"
               @change="$emit('change')">
        <span class="checkbox__checkmark"></span>
    </label>
</template>

<script>
	export default {
		name: "Checkbox",
		props: {
			value: Boolean
		},
	}
</script>

<style lang="scss">
    .checkbox {
        display: block;
        flex-shrink: 0;
        position: relative;
        height: 18px;
        width: 18px;
        margin-right: 15px;
        /*margin-bottom: 12px;*/
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &__input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;

            &:checked {
                ~ .checkbox__checkmark {
                    background-color: $disables-color;
                    border-color: $disables-color;

                    &:after {
                        display: block;
                    }
                }
            }
        }

        &__checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border: 2px solid $primary-color;
            border-radius: 2px;
            box-sizing: border-box;
            transition: 0.3s;

            &:after {
                content: "";
                position: absolute;
                display: none;
                left: 4px;
                top: 1px;
                width: 4px;
                height: 7px;
                border: solid white;
                border-width: 0 2px 2px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                transition: 0.3s;
            }
        }

        &:hover {
            .checkbox__input:not(:checked) {
                ~ .checkbox__checkmark {
                    background-color: $primary-color;
                }
            }
        }
    }
</style>