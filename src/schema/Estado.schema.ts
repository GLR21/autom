import { z, number, string } from "zod";

export const createEstadoSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number().optional(),
				nome: string( { required_error: 'Nome é obrigatório' } ),
				sigla: string( { required_error: 'Sigla é obrigatória' } ),
				cod_ibge: number( { required_error: 'Código IBGE é obrigatório' } )
			}
		)
	}
);

export type CreateEstadoSchema = z.infer<typeof createEstadoSchema>;
