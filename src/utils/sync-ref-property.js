import { computed, unref } from 'vue';

export function syncRefProperty(ref, key, defaultValue) {
	return computed({
		get() {
			return ref.value?.[key] ?? unref(defaultValue);
		},
		set(value) {
			ref.value = Object.assign({}, ref.value, { [key]: value });
		},
	});
}
