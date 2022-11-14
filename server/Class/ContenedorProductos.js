import { generateSingularItems } from '../Utils/fakerGeneration.js';

export class ContenedorProductos {
	// mostrar 5 items random
	getAllItems() {
		try {
			// puedes pasarle otro numero como param para que muestre mas items
			return generateSingularItems(5);
		} catch (e) {
			throw new Error('Algo salio mal con los items');
		}
	}
}
