import { z, number, string } from "zod";

export const createCidadeSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number().optional(),
				nome: string( { required_error: 'Nome é obrigatório' } ),
				cod_ibge: number( { required_error: 'Código IBGE é obrigatório' } ),
				ref_estado: number( { required_error: 'Estado é obrigatório' } )
			}
		)
	}
);

export type CreateCidadeSchema = z.infer<typeof createCidadeSchema>;