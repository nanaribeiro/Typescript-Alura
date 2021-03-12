import {Negociacao} from './index';
import {MeuObjeto} from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes>
{
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao)
    {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[]
    {
        //programação defensiva para n apagar o array
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void
    {
        console.log(`Impressão`);
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean
    {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}