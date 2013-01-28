// Filename: src/js/modules/server.js
define([
    'jquery'
    ], function ($) {

    // set defaults for all api requests
    $.ajaxSetup({

        // // all api requests are called synchronously
        // async: false,
        // // append token to all api requests to authenticate
        // headers: {
        //         token: window.localStorage.getItem('token')
        // }
    });


    var server = {

        // server config
        url: 'i43pc164.ipd.kit.edu',
        port: '80',
        root: '/PSEWS1213MensaGruppe1/MensaAppServer/api/backend/',

        // returns the basic server http address
        getAddress: function () {
            return 'http://' + this.url + ':' + this.port + this.root;
        },

        checkToken: function () {
            return true;
        }

    };

    return server;
});