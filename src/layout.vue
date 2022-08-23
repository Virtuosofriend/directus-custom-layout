<template>
    <div class="layout-tabular">
        <v-table
            ref="doulderis"
            class="table"
            fixed-header
            show-resize
            must-sort
            selection-use-keys
            server-sort
            :items="items"
            v-model:headers="headers"
        >
            <template #footer>
                <div class="footer__slot">
                    <div class="footer__row">
                        <p>
                            Summary: {{ summary }} €
                        </p>
                    </div>
                    <div class="footer">
                        <p>
                            page: {{ page }}
                        </p>
                        <div class="pagination">
                            <v-pagination
                                v-if="totalPages > 1"
                                :length="totalPages"
                                :total-visible="7"
                                show-first-last
                                :model-value="page"
                                @update:model-value="toPage"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </v-table>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
	inheritAttrs: false,
	props: {
		collection: {
			type: String,
			required: true,
		},
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        totalPages: {
            type: Number
        },
        itemCount: {
            type: Number
        },
        page: {
            type: Number
        },
        toPage: {
            type: Function
        },
        layoutQuery: {
            type: Object
        }
	},

    setup(props) {
        const summary = computed(() => {
            let result = 0;
            props.items.forEach(item => {
                result += item.price;
            })
            return result;
        });

        return {
            summary
        }
    }
};
</script>

<style scoped>
.layout-tabular {
	display: contents;
	margin: 20px;
	margin-bottom: 22px;
}
.footer__slot {
    display: flex;
    flex-direction: column;

}
.footer {
	position: sticky;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 32px var(--content-padding);
}
.pagination {
	display: inline-block;
}

.per-page {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 240px;
	color: var(--foreground-subdued);
}
.per-page span {
	width: auto;
	margin-right: 4px;
}

.per-page .v-select {
	color: var(--foreground-normal);
}
</style>
