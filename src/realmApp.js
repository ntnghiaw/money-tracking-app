const Realm = require("realm");
const { applyInitialSubscriptions } = require("./subscriptions");
const config = require("./config");

let realm;
let app;

function setupApp(appId) {
  const appConfig = {
    id: appId,
  };


  app = new Realm.App(appConfig);

  config.setValue("appId", appId);
}

function getApp() {
  return app;
}

// General error handler: this will handle manual client reset,
// but is also needed if breaking changes are applied, as "discardLocal" won't be enough
function errorSync(session, error) {
  let msg = "";

  switch (error.name) {
    case 'ClientReset':
      if (realm != undefined) {
        const realmPath = realm.path;

        closeRealm();

        msg = `Error: ${error.message} Need to reset ${realmPath} and exit…`;

        Realm.App.Sync.initiateClientReset(app, realmPath);
      } else {
        msg = `Error: ${error.message} Exiting…`;
      }
      output.error(msg);
      // We can't rely on when this is called, to have a clean recover,
      // chances are that we're inside one of the `inquirer` promises, so we can't do much
      setTimeout(() => { process.exit(error.code) }, 1000);

      break;
    // Handle other cases…
    default:
      msg = `Error: ${error.message}${error.isFatal ? " Exiting…" : ""}`;

      output.error(msg);
 
      if (error.isFatal) {
        setTimeout(() => { process.exit(error.code) }, 1000);
      }
      break;
  }
}




async function getRealm() {
  if (realm == undefined) {

    return openRealm()
      .then(aRealm => {
        realm = aRealm;
        // Progress notifications don't apply to Flexible Sync yet
        // aRealm.syncSession.addProgressNotification('download', 'reportIndefinitely', transferProgress);
        return applyInitialSubscriptions(realm);
      })
      .then(() => {
        return realm;
      })
      .catch(reason => {
        console.log(reason)
      });
  } else {
    return new Promise((resolve, reject) => {
      resolve(realm);
    });
  }
}

function isAppConnected() {
  if (realm == undefined) {
    return false;
  }
  return realm.syncSession.connectionState != "disconnected";
}

function closeRealm() {
  if (realm != undefined) {
    // realm.syncSession.removeProgressNotification(transferProgress);
    realm.close();
    realm = undefined;
  }
}

exports.getApp = getApp;
exports.setupApp = setupApp;
exports.getRealm = getRealm;
exports.isAppConnected = isAppConnected;
exports.closeRealm = closeRealm;