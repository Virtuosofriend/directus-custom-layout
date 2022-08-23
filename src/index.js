import { ref, toRefs } from 'vue';
import LayoutComponent from './layout.vue';
import { useItems, useStores, useSync } from '@directus/extensions-sdk';
import { syncRefProperty } from "./utils/sync-ref-property";
export default {
	id: 'custom-layout',
	name: 'Custom layout',
	icon: 'box',
	component: LayoutComponent,
	slots: {
		options: () => null,
		sidebar: () => null,
		actions: () => null,
	},

	setup(props, { emit }) {
		const name = ref("Custom layout");
        const { collection, filter, filterUser, search } = toRefs(props);

        const layoutQuery = useSync(props, "layoutQuery", emit);
        const layoutOptions = useSync(props, "layoutOptions", emit);

        const { useFieldsStore } = useStores();
        const fieldsStore = useFieldsStore();
        let activeFields = [];
        let headers = [];

        const defaultHeaders = fieldsStore.getFieldsForCollectionSorted(collection.value);
        defaultHeaders.forEach(header => {
            const values = { ...header };
            const { field, name, type } = values;
            const headerObject = {
                text: name,
                value: field
            };
            if ( type != "alias" ) {
                activeFields.push(field);
                headers.push(headerObject);
            }
        });
        
        // const page = ref(1);
        const { page } = useItemOptions();
        const { items, loading, error, totalPages, itemCount, totalCount, getItems } = useItems(
            collection,
            {
                page,
                limit: 2,
                filter,
                search,
                fields: activeFields
            }
        );

		return { 
            name,
            totalPages, 
            itemCount,
            items,
            filter,
			search,
            headers,
            toPage,
            page,
        };

        function refresh() {
			getItems();
		}

		function toPage(newPage) {
			page.value = newPage;
		}

        function useItemOptions() {
            const page = syncRefProperty(layoutQuery, 'page', 1);
			return { page };
		}
	},
};
