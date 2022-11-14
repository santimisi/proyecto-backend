
export interface authorType {
    email: string;
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
  }
  export interface messageType {
    author: authorType;
    text: string;
    timeStamp: string;
  }