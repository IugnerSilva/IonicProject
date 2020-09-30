export class Admin {
    uid: string;
    nome: string;
    cpf: string;
    senha: string;
    email: string;
    phone: string;
    picture: string;
    profileUID: string;
    confirmed: boolean;
}

export class Profile {
    uid: string;
    description: string;
    isAdmin: boolean;
}