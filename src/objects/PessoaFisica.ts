import { Pessoa } from "./Pessoa";

class PessoaFisica 
    extends
        Pessoa
{

    cpf             :string;
    rg              :string;
    data_nascimento :Date;

    constructor
    ( 
        id              :Number|null = null,
        nome            :string,
        email           :string,
        senha           :string|null,
        telefone        :string,
        sys_auth        :Number = 2,
        cep             :string,
        rua             :string,
        bairro          :string,
        numero_endereco  :Number,
        cidade          :string,
        estado          :string,
        tipo_pessoa     :Number,
        cpf             :string,
        rg              :string,
        data_nascimento :Date
    )
    {
        super( id, nome, email, senha, telefone, sys_auth, cep, rua, bairro,numero_endereco, cidade,estado, tipo_pessoa );
        this.cpf                = cpf;
        this.rg                 = rg;
        this.data_nascimento    = data_nascimento;
    }
}

export { PessoaFisica };