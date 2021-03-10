
import{logarTempoDeExecucao} from '../helpers/decorators/index'

export abstract class View<T>
{
    private _elemento: JQuery;
    private _escapar: boolean;
    //A interogação indica que o parametro é opcional
    //Parametros opcionais sao sempre no final da assinatura do construtor
    constructor(seletor: string, escapar: boolean = false)
    {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao(true)
    update(model: T)
    {
        let template = this.template(model);

        if(this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._elemento.html(template);
    }

    abstract template(model: T): string;

}