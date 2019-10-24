<template>
    <div class="listItem" :class="{'listItem--done': itemData.done}">
        <Checkbox :value="itemData.done" @change="changeStatus"/>
        <div class="listItem__text" contenteditable="false" ref="text" @keypress.enter="save">{{itemData.text}}</div>
        <div class="listItem__buttonContainer">
            <div class="listItem__button listItem__button--edit" v-if="!editing" @click="edit">
                <EditIcon/>
            </div>
            <div class="listItem__button" v-if="editing" @click="save">
                <SaveIcon/>
            </div>
            <div class="listItem__button" @click="deleteItem">
                <DeleteIcon/>
            </div>
        </div>
    </div>
</template>

<script>
	import EditIcon from './icons/EdtIcon';
	import SaveIcon from './icons/SaveIcon';
	import DeleteIcon from './icons/DeleteIcon';
	import Checkbox from "./Checkbox";

	export default {
		props: {
			itemData: Object
		},
		name: "ListItem",
		components: { EditIcon, SaveIcon, DeleteIcon, Checkbox },
		data () {
			return {
				editing: false,
			}
		},
		methods: {
			placeCaretAtEnd (el) {
				el.focus();
				if (typeof window.getSelection != "undefined"
						&& typeof document.createRange != "undefined") {
					let range = document.createRange();
					range.selectNodeContents(el);
					range.collapse(false);
					let sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (typeof document.body.createTextRange != "undefined") {
					let textRange = document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(false);
					textRange.select();
				}
			},
			edit () {
				if (!this.itemData.done) {
					this.editing = true;
					this.$refs.text.setAttribute('contenteditable', true);
					this.placeCaretAtEnd(this.$refs.text)
				}
			},
			save () {
				this.$store.commit('change', {
					id: this.itemData.id,
					property: 'text',
					value: this.$refs.text.innerText
				});
				this.editing = false;
				this.$refs.text.setAttribute('contenteditable', false);
			},
			deleteItem () {
				this.$store.commit('deleteItem', { id: this.itemData.id })
			},
			changeStatus () {
				this.$store.commit('change', {
					id: this.itemData.id,
					property: 'done',
					value: !this.itemData.done
				});
			}
		},
	}
</script>

<style lang="scss">

    .listItem {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        margin: 15px 0;
        transition: .4s;

        &--done {
            color: $disables-color;

            .listItem__button--edit {
                cursor: auto;

                svg {
                    fill: $disables-color;
                }
            }
        }

        &__text {
            outline: none;
        }

        &__buttonContainer {
            display: flex;
            flex-wrap: nowrap;
            margin-left: auto;
        }

        &__button {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 25px;
            cursor: pointer;

            svg {
                height: 100%;
                width: 100%;
            }

        }
    }
</style>