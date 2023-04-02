import { TypeOf, number, string, z } from "zod";

export const createPessoaSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number().optional(),
				nome: string( { required_error: 'Nome é obrigatório' } ),
				email: string( { required_error: 'E-mail é obrigatório' } ).email( 'Email inválido' ),
				senha: string( { required_error: 'Senha é obrigatória' } ).regex( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Este campo não deve ser vazio. Deve conter no mínimo: um caractere maiúsculo, um caractere especial, um caractere minúsculo e ter um tamanho mínimo de 8 caracteres' ),
				telefone: string( { required_error: 'Telefone é obrigatório' } ).nonempty(),
				sys_auth: number().optional().default( 2 ),
				cep: string( { required_error: 'CEP é obrigatório' } ).nonempty().regex(  /^[0-9]{5}-[0-9]{3}$/, 'CEP inválido' ),
				rua: string( { required_error: 'Rua é obrigatória' } ).nonempty(),
				bairro: string( { required_error: 'Bairro é obrigatório' } ).nonempty(),
				numero_endereco: number( { required_error: 'Número do endereço é obrigatório' } ),
				ref_cidade: number( { required_error: 'Cidade é obrigatória' } ),
				tipo_pessoa: number().optional().default( 1 )
			}
		)
	}
);

export const updatePessoaSchema = z.object
(
	{
		body:z.object
		(
			{
				id: number().optional(),
				nome: string( { required_error: 'Nome é obrigatório' } ),
				email: string( { required_error: 'E-mail é obrigatório' } ).email( 'Email inválido' ),
				senha: string().optional(),
				telefone: string( { required_error: 'Telefone é obrigatório' } ).nonempty(),
				sys_auth: number().optional().default( 2 ),
				cep: string( { required_error: 'CEP é obrigatório' } ).nonempty().regex(  /^[0-9]{5}-[0-9]{3}$/, 'CEP inválido' ),
				rua: string( { required_error: 'Rua é obrigatória' } ).nonempty(),
				bairro: string( { required_error: 'Bairro é obrigatório' } ).nonempty(),
				numero_endereco: number( { required_error: 'Número do endereço é obrigatório' } ),
				ref_cidade: number( { required_error: 'Cidade é obrigatória' } ),
				tipo_pessoa: number().optional().default( 1 )
			}
		)
	}
);

export type CreatePessoaSchema = z.infer<typeof createPessoaSchema>;

export type UpdatePessoaSchema = z.infer<typeof updatePessoaSchema>;