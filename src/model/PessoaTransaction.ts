import { Pessoa } from "../interfaces/Pessoa.model";
import { JUtil } from "../util/JUtil";
import Logging from "../util/Logging";
import { Transaction } from "./interface/Transaction";
import { PessoaFisicaTransaction } from "./PessoaFisicaTransaction";
import { PessoaJuridicaTransaction } from "./PessoaJuridicaTransaction";


class PessoaTransaction
    extends 
        Transaction
            implements
                TransactionInterface<Pessoa>
{
    constructor()
    {
        super();
    }

    async store( pessoa:Pessoa)
    {
        let insert;
     
            insert =
            
            `INSERT INTO 
                pm_pessoa 
                ( 
                    nome, 
                    email, 
                    senha, 
                    telefone, 
                    sys_auth,
                    cep,
                    rua,
                    bairro,
                    numero_endereco,
                    ref_cidade,
                    tipo_pessoa 
                ) 
                values 
                ( 
                    '${pessoa.nome}', 
                    '${pessoa.email}',
                    '${ JUtil.hashString( pessoa.senha, JUtil.SHA256 ) }',
                    '${pessoa.telefone}',
                    ${pessoa.sys_auth},
                    '${pessoa.cep}',
                    '${pessoa.rua}',
                    '${pessoa.bairro}',
                    ${pessoa.numero_endereco},
                    '${pessoa.ref_cidade}',
                    ${pessoa.tipo_pessoa}
                ) RETURNING id`;
     
        try
        {
            return await super.query( insert ).then( ( res )=>{ return true } ).catch( ( e )=>{ throw e });
        }
        catch ( e:any )
        {
            Logging.error( e.message );
            throw e;    
        }

        
                   
    }

    async getAll()
    {
        let getAll = 'Select * from pm_pessoa order by id asc;';

        try
        {
            return await super
                        .query( getAll )
                        .then
                        ( 
                            ( res )=>
                            {
                                let array_pessoa = new Array();
                                if( res.rows.length != 0 )
                                {
                                    res.rows.forEach
                                    (
                                        element => 
                                        {
                                            array_pessoa.push
                                            ( 
                                                {
                                                    "id": element.id,
                                                    "nome": element.nome,
                                                    "email": element.email,
                                                    "senha": element.senha,
                                                    "telefone": element.telefone,
                                                    "sys_auth": element.sys_auth,
                                                    "cep": element.cep,
                                                    "rua": element.rua,
                                                    "bairro": element.bairro,
                                                    "numero_endereco": element.numero_endereco,
                                                    "ref_cidade": element.ref_cidade,
                                                    "tipo_pessoa": element.tipo_pessoa
                                                }
                                            );
                                        }
                                    );
                                }
                                return array_pessoa
                            } 
                        ).catch( ( e )=>{ throw e } );

        }
        catch( e:any )
        {
            Logging.error( e.message );
            throw e;
        }

    }

    async get( id:Number )
    {
        let query = `Select * from pm_pessoa where id = ${id}`;
        
        try
        {
            return await super
                        .query( query )
                        .then
                        ( 
                            async ( res )=>
                            { 
                                let pessoa;
    
                                res.rows.forEach( element =>
                                {
                                    pessoa =
                                    {
                                        "id": element.id,
                                        "nome": element.nome,
                                        "email": element.email,
                                        "senha": element.senha,
                                        "telefone": element.telefone,
                                        "sys_auth": element.sys_auth,
                                        "cep": element.cep,
                                        "rua": element.rua,
                                        "bairro": element.bairro,
                                        "numero_endereco": element.numero_endereco,
                                        "ref_cidade": element.ref_cidade,
                                        "tipo_pessoa": element.tipo_pessoa
                                    }       
                                });
    
                                return pessoa;
                            } 
                        );
        }
        catch( e:any )
        {
            Logging.error( e.message );
            throw e;
        }
    }

    async delete( id:Number )
    {
        let delete_query = `DELETE FROM pm_pessoa where id=${id}`;
        
        try
        {
            return await super
                        .query( delete_query )
                        .then
                        ( 
                            ()=> 
                            { 
                                return true; 
                            } 
                        ).catch( ( e )=>{ throw e } );
        }
        catch( e:any )
        {
            Logging.error( e.message );
            throw e;
        }
    }

    async update( pessoa:Pessoa )
    {
        let update_query =
            `
                UPDATE
                    pm_pessoa
                        set
                            nome='${pessoa.nome}',
                            email='${pessoa.email}',
                            telefone='${pessoa.telefone}',
                            sys_auth=${pessoa.sys_auth},
                            cep='${pessoa.cep}',
                            rua='${pessoa.rua}',
                            bairro='${pessoa.bairro}',
                            numero_endereco=${pessoa.numero_endereco},
                            ref_cidade='${pessoa.ref_cidade}',
                            tipo_pessoa=${pessoa.tipo_pessoa}
                        where id=${pessoa.id}`;
        
        try
        {
            return await super.query( update_query ).then( ( res )=>{ return true } ).catch( ( e )=>{ throw e } );
        }
        catch( e:any )
        {
            Logging.error( e.message );
            throw e;
        }
    }

    async getPessoaLogin( parameter:any )
    {
        let query =
            `select
                *
            from
                pm_pessoa
            where
                pm_pessoa.email= '${parameter.email}'
                and pm_pessoa.senha = '${JUtil.hashString( parameter.senha, JUtil.SHA256 )}'`;
        return await super.query(  query ).then( ( res )=> {  return res.rows[0] } );
    }
}

export { PessoaTransaction };