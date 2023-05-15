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
				total: number()

			}
		)
	}
)

export type CreatePedidoSchema = z.infer<typeof createPedidoSchema>;