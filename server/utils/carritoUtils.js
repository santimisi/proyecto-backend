export const getNewCartId = (maxLength) => {
	if (maxLength < 1) {
		return 1;
	} else {
		return maxLength + 1;
	}
};

export const removeObjectWithId = (arr, id) => {
	const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
	if (objWithIdIndex === -1) {
		return arr;
	} else {
		arr.splice(objWithIdIndex, 1);
		return arr;
	}
};
