export function domInject(seletor: string)
{
    return function(target: any, key: string)
    {
        let elemento: JQuery;

        const getter = function()
        {
            if(!elemento)
            {
                //Sintaxe para buscar o elemento do DOM no JQUERY
                console.log(`buscando ${seletor} para injetar em ${key}`);
                elemento = $(seletor);
            }
            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}