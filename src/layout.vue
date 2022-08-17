<template>
    <div class="layout-tabular">
        <v-table
            ref="doulderis"
            class="table"
            fixed-header
            show-resize
            must-sort
            selection-use-keys
            :items="items"
            v-model:headers="headers"
        >
        <template #footer>
            <div class="footer">
                <p>
                    {{ page }}
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
        </template>
        </v-table>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useApi } from '@directus/extensions-sdk';

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
        }
	},

    setup(props) {
        const api = useApi();

        let collectionHeaders = [];

        watch(
            () => props.page,
        );

        return { collectionHeaders }
        
    }
};
</script>

<style scoped>
.layout-tabular {
	display: contents;
	margin: 20px;
	margin-bottom: 22px;
}
</style>
