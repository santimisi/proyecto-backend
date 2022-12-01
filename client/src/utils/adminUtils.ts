export interface itemType {
    alcohol:string,
    codigo:string,
    descripcion:string,
    foto:string,
    nombre: string,
    price: number,
    region: string,
    stock: number,
    timestamp:string,
    quantity:number,
    type:string,
    _id:string,
    id:string,
}

export interface cartType {
    _id:string;
    productos: object[];
    timestamp:string;

}

// type for regular user
export interface Usertype {
    _id:string;
    userName:string;
    isAdmin: boolean;
    name:string;
    lastName:string;
    lastLogin:string;
    profilePicture:string;
}

// type for Form new Item 
export interface FormDataType {
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    price: number;
    stock: number;
    type: string;
    alcohol: number;
    region: string;
    sold: number;
  }
  
  // type for existing item to modify and send the form
 export interface ExistingItemFormDataType {
    _id: string;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    price: number;
    stock: number;
    type: string;
    alcohol: number;
    region: string;
    sold: number;
    quantity: number;
  }

  export interface LoginFormDataType {
    userName:string;
    password:string;
  }
  export interface SigninFormDataType {
    userName:string;
    password:string;
    isAdmin:boolean;
    name: string;
    lastName:string;
    profilePicture:string;
  }

  export interface IsLoggedDataType {
    userName?: string,
    isAuth: boolean,
	session?: string,
	isAdmin?: boolean,
  }

  
// get number without commas
export const numberWithCommas = (number : number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// get all the current Items in stock
export const allItemsInStock = (allItems: itemType[]) => {
    return numberWithCommas(allItems.reduce((prev:any, cur:any) => prev + cur.stock , 0));
}
// get all the current sales this year
export const allItemsSoldYearly = (allItems: itemType[]) => {
    return numberWithCommas(allItems.reduce((prev:any, cur:any) => prev + cur.sold , 0));
}

// sort items depending on stock
export const sortArrayDesAsc = (allItems: itemType[], sortDirection:string) => {
    const copyArray = [...allItems];
    copyArray.sort((a, b) => {
        return sortDirection === "0" ? a.stock - b.stock : b.stock - a.stock;
      });
      return copyArray
}

// limit characters displayed
export const limitText = (string:string,limit:number) => {
    return string.substring(0, limit);
}

// encuentra numero de admins y regresa int con el numero total de admins
export const findAllAdmins = (allUsersArray : Usertype[]) => {
  let counter = 0;
  allUsersArray.forEach(user => {
    if(user.isAdmin) counter++
  })
  return counter
}
