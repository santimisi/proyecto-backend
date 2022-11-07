export interface itemType {
    alcohol:string,
    codigo:string,
    descripcion:string,
    foto:string,
    nombre: string,
    price: number,
    region: string,
    stock: number,
    timestamp:number,
    type:string,
    _id:string,
    id:string,
}

export const allItemsInStock = (allItems: itemType[]) => {
    return allItems.reduce((prev:any, cur:any) => prev + cur.stock , 0);
}

export const sortArrayDesAsc = (allItems: itemType[], sortDirection:string) => {
    const copyArray = [...allItems];
    copyArray.sort((a, b) => {
        return sortDirection === "0" ? a.stock - b.stock : b.stock - a.stock;
      });
      return copyArray
}