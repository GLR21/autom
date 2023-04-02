import { PessoaTransaction } from "../model/PessoaTransaction";
import { Pessoa } from "../interfaces/Pessoa.model";



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

export async function getPessoa( id:any )
{
	try
	{
		let pessoaTransaction = new PessoaTransaction();
		let pessoa = await pessoaTransaction.get( id );
		return pessoa;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}


export async function getAllPessoas()
{
	try
	{
		let pessoaTransaction = new PessoaTransaction();
		let pessoas = await pessoaTransaction.getAll();
		return pessoas;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function deletePessoa( id:any )
{
	try
	{
		let pessoaTransaction = new PessoaTransaction();
		let pessoa = await pessoaTransaction.delete( id );
		return pessoa;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function updatePessoa( input:Pessoa )
{
	try
	{
		let pessoaTransaction = new PessoaTransaction();
		let pessoa = await pessoaTransaction.update( input );
		return pessoa;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}