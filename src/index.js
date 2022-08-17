import { ref, toRefs } from 'vue';
import LayoutComponent from './layout.vue';
import { useItems, useStores, useSync } from '@directus/extensions-sdk';

export default {
	id: 'doulderis-layout',
	name: 'Doulderis layout',
	icon: 'box',
	component: LayoutComponent,
	slots: {
		options: () => null,
		sidebar: () => null,
		actions: () => null,
	},

	setup(props) {
		const name = ref("Doulderis layout");
        const { collection, filter, filterUser, search, layoutQuery } = toRefs(props);

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

        const { page } = useItemOptions();
        const { items, loading, error, totalPages, itemCount, totalCount, changeManualSort, getItems } = useItems(
            collection,
            {
                page,
                limit: 1,
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
            toPage
        };

        function refresh() {
			getItems();
		}

		function toPage(newPage) {
            console.log(newPage)
			page.value = newPage;
		}

        function useItemOptions() {
			const page = useSync(layoutQuery, 'page', 1);
			return { page };
		}
	},
};
