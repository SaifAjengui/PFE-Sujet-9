
sap.ui.define([], function () {

    "use strict";

    return {

        convert: function (sStatus) {

            switch(sStatus){

                case 'S':

                    return 'Success'

                case 'E':

                    return 'Error'

                case 'W':
                    return 'Warning'

                case '':
                    return 'Information'

            }

        }

    };

});