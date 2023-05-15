import { PecasPedidos } from "./PecasPedido.model";

export interface Pedido
{
	id?: number|undefined;
	ref_pessoa: number;
	pecasPedido: PecasPedidos[];
	status: number;
	total: number;
}