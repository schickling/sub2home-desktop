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
                        // check if token even avaliable
                        if (!window.localStorage.hasOwnProperty('token')) {
                                return false;
                        }

                        // validate token through server request
                        var valid = false;
                        $.ajax({
                                url: this.getAddress() + 'checkToken',
                                type: 'post',
                                async: false,
                                success: function () {
                                        valid = true;
                                }
                        });

                        return valid;
                }

        };

        return server;
});