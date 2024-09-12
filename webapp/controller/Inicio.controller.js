sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {
                // Definição de lista vazia de Resultados
                let resultados = {

                    titles: []
                }
                // Definição de Modelo - Variável especial para mostrar dados na tela

                let resultadosModel = new JSONModel();
                // Atribuição de dados
                resultadosModel.setData(resultados);
                // Anexar modelo na tela
                let tela = this.getView();
                tela.setModel(resultadosModel, "APINetflix");
            },

            onInicioLinkPress: function () {

                alert("Navegar para tela Inicial");
            },

            onSearchFieldSearch: function () {

                // Busca de dados na API da Netflix
                let searchField = this.byId("idSearchField");
                let filtro = searchField.getValue();

                alert(filtro);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='
                        + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '5e42b61102msh35bfd06ed2eedd7p10945djsn1e25de883d0a',
                        'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                    }
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);

                    // Resgatar o modelo e atualizar os dados

                    let tela = this.getView();
                    let modelo = tela.getModel("APINetflix");
                    let dados = modelo.getData();

                    // LImpar a lista

                    dados.titles = [];
                    dados.titles = response.titles;
                    modelo.refresh();

                }.bind(this));
            }


        });
    });
