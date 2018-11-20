// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCMl1DjMmiRyxJ67rv3-i_rBRA2GAWumPc',
    authDomain: 'app-ingreso-egreso.firebaseapp.com',
    databaseURL: 'https://app-ingreso-egreso.firebaseio.com',
    projectId: 'app-ingreso-egreso',
    storageBucket: 'app-ingreso-egreso.appspot.com',
    messagingSenderId: '1020657789663'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
