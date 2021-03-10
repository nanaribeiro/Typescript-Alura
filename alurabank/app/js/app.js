System.register(["./controllers/NegociacaoControlles"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoControlles_1, controller;
    return {
        setters: [
            function (NegociacaoControlles_1_1) {
                NegociacaoControlles_1 = NegociacaoControlles_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoControlles_1.NegociacaoController();
            $('.form').submit(controller.adiciona.bind(controller));
            $('#botao-importa').click(controller.importarDados.bind(controller));
        }
    };
});
