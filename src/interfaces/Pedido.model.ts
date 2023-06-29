import { PecasPedidos } from "./PecasPedido.model";

export interface Pedido
{
	id?: number|undefined;
	ref_pessoa: number;
	pecasPedido: PecasPedidos[];
	status: number;
	total: 	number;
	cep?: string | undefined | null;
	rua?: string | undefined | null;
	bairro?: string | undefined| null ;
	numero_endereco?: string | undefined | null ;
	ref_cidade?: number | undefined | null;
	fl_usar_endereco_cliente?: boolean | undefined | null;
}