export function logarTempoDeExecucao(emSegundos: boolean = false)
{
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor)
    {
        //Método aonde será posicionado 
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[])
        {
            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos)
            {
                unidade= 's';
                divisor = 100;
            }
            
            console.log('-----------------------')
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                console.log(`Resultado do método ${propertyKey} ${JSON.stringify(retorno)}` )
                const t2 = performance.now();
                console.log(`${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
                console.log('-----------------------')
                return retorno;
        }

        return descriptor;
    }
}