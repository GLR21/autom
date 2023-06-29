import { z, number } from "zod";

export const createPedidoSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number().optional(),
				ref_pessoa: number(),
				pecasPedido: z.array( z.object( { ref_peca: number(), quantidade: number() } ) ),
				status: number(),
				total: number(),
				cep: z.string().optional(),
				rua: z.string().optional(),
				bairro: z.string().optional(),
				numero_endereco: z.string().optional(),
				ref_cidade: number().optional(),
				fl_usar_endereco_cliente: z.boolean().optional()
			}
		)
	}
)

export const updatePedidoSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number( { required_error: 'Código de pedido é obrigatório' } ),
				ref_pessoa: number(),
				pecasPedido: z.array( z.object( { ref_peca: number(), quantidade: number() } ) ),
				status: number(),
				total: number(),
				cep: z.string().optional(),
				rua: z.string().optional(),
				bairro: z.string().optional(),
				numero_endereco: z.string().optional(),
				ref_cidade: number().optional(),
				fl_usar_endereco_cliente: z.boolean().optional()

			}
		)
	}
)

export type CreatePedidoSchema = z.infer<typeof createPedidoSchema>;
export type UpdatePedidoSchema = z.infer<typeof updatePedidoSchema>;