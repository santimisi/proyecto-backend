import { faker } from '@faker-js/faker';

// funcion que genera items dependiendo de cuantos reciba como parametro
export const generateSingularItems = (itemsWanted) => {
	const completedArrayOfItems = [];
	for (let i = 0; i < itemsWanted; i++) {
		completedArrayOfItems.push({
			id: faker.database.mongodbObjectId(),
			title: faker.commerce.product(),
			price: faker.commerce.price(),
			thumbnail: faker.image.image(1234, 2345, true),
		});
	}
	return completedArrayOfItems;
};
