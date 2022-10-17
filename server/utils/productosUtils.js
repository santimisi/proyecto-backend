//agrega un ID nuevo al item, si no tiene pone 1
export const getNewId = (maxLength) => {
	if (maxLength < 1) {
		return 1;
	} else {
		return maxLength + 1;
	}
};

//esta funcion filtra el aray total de items y le quita el que se quiera borrar
export function removeObjectWithId(arr, id) {
	const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
	arr.splice(objWithIdIndex, 1);
	return arr;
}
