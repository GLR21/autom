import { PessoaTransaction } from "../model/PessoaTransaction";
import { Pessoa } from "../models/Pessoa.model";



export async function createPessoa( input:Pessoa )
{
	try
	{
		let pessoaTransaction = new PessoaTransaction();
		let pessoa = await pessoaTransaction.store( input );//Modificar metodoa de criar pessoa
		return pessoa;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}