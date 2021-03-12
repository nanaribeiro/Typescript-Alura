import {NegociacoesView, MensagemView} from '../views/index';
import {Negociacoes, Negociacao} from '../models/index';
import {domInject, throttle} from '../helpers/decorators/index';
import {NegociacaoService} from '../services/index';
import {imprime} from '../helpers/index'

export class NegociacaoController
{
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    
    private _service = new NegociacaoService();

    constructor()
    {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event)
    {
        event.preventDefault();

        let data = new Date(new Date(this._inputData.val().replace(/-/g, '/')));

        if(!this._ehDiaUtil(data))
        {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }

        const negociacao = new Negociacao(
            //Trocar hífen por vírgula
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

    }
    
    private _ehDiaUtil(data: Date)
    {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    async importarDados()
    {  
        try
        {
            //Só irá importar se já não tiverem sido importadas
            //Código que trabalha com promise para n precisar do then
            //para obter os dados é utilizado o async no método
            //Quando tem await espera a instrução ser executada para continuar
            //o código de importarDados mas a aplicação continua executando normal
            const negociacoesParaImportar = await this._service
            .obterNegociacoes(res => 
            {
                if(res.ok)
                {
                    return res;
                }
                else
                {
                    throw new Error(res.statusText);
                }
            });

            const negociacoesJaImportadas = this._negociacoes.paraArray();
            
            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
        } catch(err)
        {
            this._mensagemView.update(err.message);
        }    
                
    }
}

enum DiaDaSemana
{
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}