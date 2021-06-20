export class LocalStorage {
	static ISSERVER = typeof window === "undefined";
	static setItem = (key, value) => {
		!LocalStorage.ISSERVER && localStorage.setItem(key, value);
	};
	static getItem = (value) => {
		return !LocalStorage.ISSERVER && localStorage.getItem(value);
	};
	static clear = () => {
		!LocalStorage.ISSERVER && localStorage.clear();
	};
}
