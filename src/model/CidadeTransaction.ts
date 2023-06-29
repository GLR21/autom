import { Cidade } from "../interfaces/Cidade.model";
import { Transaction } from "./interface/Transaction";

class CidadeTransaction
	extends
		Transaction
			implements
				TransactionInterface<Cidade>
{
	async store(parameter: Cidade)
	{
		try
		{
			let query =
				`INSERT INTO
					pm_cidade
						(nome, cod_ibge, ref_estado)
					values
						( '${parameter.nome}' , ${parameter.cod_ibge}, ${parameter.ref_estado}) RETURNING id`;	
			return await super.query(query).then( (res) => { return true } ).catch( (e) => { throw e } );
		}
		catch (e:any)
		{
			throw new Error(e);
		}
	}

	async delete(parameter: Number)
	{
		try
		{
			let query = `DELETE FROM pm_cidade WHERE id = ${parameter}`;
			return await super.query(query).then( (res) => { return true } ).catch( (e) => { throw e } );
		}
		catch (e:any)
		{
			throw new Error(e);
		}
	}
	
	async get(parameter: any)
	{
		try
		{
			let query = `SELECT * FROM pm_cidade WHERE id = ${parameter}`;
			return await super.query(query).then( (res) => { return res.rows[0] } ).catch( (e) => { throw e } );
		}
		catch(e:any)
		{
			throw new Error(e);
		}
	}

	async getAll()
	{
		try
		{
			let query = `SELECT * FROM pm_cidade`;
			return await super.query(query).then( (res) => { return res.rows } ).catch( (e) => { throw e } );
		}
		catch(e:any)
		{
			throw new Error(e);
		}
	}

	async update(parameter: Cidade)
	{
		try
		{
			let query = `UPDATE pm_cidade SET nome = '${parameter.nome}', cod_ibge = ${parameter.cod_ibge}, ref_estado = ${parameter.ref_estado} WHERE id = ${parameter.id}`;
			return await super.query(query).then( (res) => { return true } ).catch( (e) => { throw e } );
		}
		catch(e:any)
		{
			throw new Error(e);
		}
	}

	async getCidadeByIBGE(parameter: any)
	{
		try
		{
			let query = `SELECT * FROM pm_cidade WHERE cod_ibge = '${parameter}'`;
			return await super.query(query).then( (res) => { return res.rows[0] } ).catch( (e) => { throw e } );
		}
		catch(e:any)
		{
			throw new Error(e);
		}
	}
}

export { CidadeTransaction };