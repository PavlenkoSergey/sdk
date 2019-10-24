<template>
    <button class="btn" :class="`${buttonTypeClass} ${buttonColorClass}`" type="button" @click="$emit('click')">
        <slot/>
    </button>
</template>

<script>
	export default {
		name: "Button",
		props: {
			variant: String,
			color: String
		},
		computed: {
			buttonTypeClass () {
				return { link: 'btn--link' }[this.variant] || '';
			},
			buttonColorClass () {
				return { primary: 'btn--primary', danger: 'btn--danger' }[this.color] || '';
			}
		},
	}
</script>

<style lang="scss">

    .btn {
        text-transform: uppercase;
        cursor: pointer;
        outline: none;
        transition: 0.3s;
        white-space: nowrap;
        flex-shrink: 0;

        &:not(.btn--link) {
            border: 1px solid transparent;
            padding: .375rem 1.5rem;
            margin-bottom: 10px;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
        }

        &--primary {
            color: $primary-color;

            &:hover {
                color: lighten($primary-color, 10);
            }
            &:not(.btn--link) {
                color: $text-color-invert;
                background-color: $primary-color;
                box-shadow: 0 5px 10px transparentize($primary-color, 0.1);

                &:hover {
                    background-color: lighten($primary-color, 10);
                }

                &:active {
                    box-shadow: 0 2px 10px transparentize($primary-color, 0.1);
                }
            }
        }

        &--danger {
            color: $danger-color;
            &:hover {
                color: lighten($danger-color, 10);
            }

            &:not(.btn--link) {
                color: $text-color-invert;
                background-color: $danger-color;
                box-shadow: 0 5px 10px transparentize($danger-color, 0.1);

                &:hover {
                    background-color: lighten($danger-color, 10);
                }

                &:active {
                    box-shadow: 0 2px 10px transparentize($danger-color, 0.1);
                }
            }
        }

        &--link {
            margin-top: 20px;
            background-color: transparent;
            border: none;
            font-weight: 700;
        }
    }

</style>