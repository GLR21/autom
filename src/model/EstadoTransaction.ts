import { Estado } from "../interfaces/Estado.model";
import { Transaction } from "./interface/Transaction";

class EstadoTransaction
	extends
		Transaction
			implements
				TransactionInterface<Estado>
{

	constructor()
    {
        super();
    }

	async store(parameter: Estado)
	{
		try
		{
			let query = `INSERT INTO pm_estado (nome, sigla, cod_ibge) values ( '${parameter.nome}' , '${parameter.sigla}', ${parameter.cod_ibge}) RETURNING id`;	
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
			let query = `DELETE FROM pm_estado WHERE id = ${parameter}`;
			return await super.query(query).then( (res) => { return true } ).catch( (e) => { throw e } );
		}
		catch (e:any)
		{
			throw new Error(e);
		}
	}
	
	async get( parameter: any )
	{
		try
		{
			let query = `SELECT * FROM pm_estado WHERE id = ${parameter}`;
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
			let query = `SELECT * FROM pm_estado`;
			return await super.query(query).then( (res) => { return res.rows } ).catch( (e) => { throw e } );
		}
		catch (e:any)
		{
			throw new Error(e);
		}
	}

	async update(parameter: Estado)
	{
		try
		{
			let query = `UPDATE pm_estado SET nome = '${parameter.nome}', sigla = '${parameter.sigla}', cod_ibge = ${parameter.cod_ibge} WHERE id = ${parameter.id}`;
			return await super.query(query).then( (res) => { return true } ).catch( (e) => { throw e } );
		}
		catch(e:any)
		{
			throw new Error(e);
		}
	}

}

export { EstadoTransaction };