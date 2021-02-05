
import { Produto } from './produto';

export class Pedidos {
    uid:string;
    data:string;
    total: number;
    nomeCli: string;
    formaPagamento: string;
    pedido: Produto[];
    rua:string;
    numero:number;
}
