const clear = require("clear");
const realmApp = require("./realmApp");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// We keep our own copy of the subscriptions' definition to support the Refresh functionality
function getSavedSubscriptions() {
  const appId = config.getValue("appId")
  let appParams = config.getValue(appId);

  if (appParams == undefined) {
    appParams = { subscriptions: {} };
    config.setValue(appId, appParams);
  } else if (appParams.subscriptions == undefined) {
    appParams.subscriptions = {};
    config.setValue(appId, appParams);
  }

  return appParams.subscriptions;
}

function getSubscriptions(realm) {
  if (!realm.subscriptions.isEmpty) {
    // Since version 12.0, no array methods for SubscriptionSet anymore
    let rSubs = [...realm.subscriptions];
    let subscriptions = [];

    rSubs.forEach((value) => subscriptions.push({ Name: value.name, Table: value.objectType, Query: value.queryString }));

    return subscriptions;
  } else {
    return [];
  }
}

async function clearSubscriptions(realm) {
  if (!realm.subscriptions.isEmpty && realmApp.isAppConnected()) {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll();
    }).catch((reason) => {
      console.error(reason);
    });

    await realm.subscriptions.waitForSynchronization();
  }
}

async function listSubscriptions() {
  const subscriptions = getSubscriptions(await realmApp.getRealm());
  console.log(subscriptions);
}

async function applyInitialSubscriptions(realm) {
  if (realm.subscriptions.isEmpty) {
    const subscriptions = getSavedSubscriptions();
    const keys = Object.keys(subscriptions);

    if (!realmApp.isAppConnected()) {
      throw {message: "App is not connected to backend!"};
    }

    if (keys.length > 0) {
      let cursors = {};

      keys.forEach(element => {
        let className = subscriptions[element]["class"];

        cursors[className] = realm.objects(className);
      });

      await realm.subscriptions.update((mutableSubs) => {
        keys.forEach(element => {
          let className = subscriptions[element]["class"];
          let objects = cursors[className];
          let query = subscriptions[element]["filter"];

          if (query.length > 2) {
            mutableSubs.add(objects.filtered(query), { name: element });
          } else {
            mutableSubs.add(objects, { name: element });
          }
        });
      });
    }
  }
}

async function addModifySubscription() {
  const realm = await realmApp.getRealm()


  // Do nothing if parameters aren't long enough
  if ((input.name.length < 2) || (input.collection.length < 2)) { return; }

  try {
    const objects = realm.objects(input.collection);

    if (objects) {
      if (!realmApp.isAppConnected()) {
        throw {message: "App is not connected to backend!"};
      }
      realm.subscriptions.update((mutableSubs) => {
        if (input.query.length > 2) {
          mutableSubs.add(objects.filtered(input.query), { name: input.name });
        } else {
          mutableSubs.add(objects, { name: input.name });
        }
      }).catch((reason) => {
        console.error(reason);
      });
  
      await realm.subscriptions.waitForSynchronization();
  
      const appId = config.getValue("appId")
      let appParams = config.getValue(appId);

      if (appParams.subscriptions == undefined) {
        appParams.subscriptions = {};
      }
      appParams.subscriptions[input.name] = { class: input.collection, filter: input.query };

      config.setValue(appId, appParams);

      console.log("Subscriptions updated!");
    } else {
      console.error(`Class ${input.class} doesn't exist!`);
    }
  } catch (err) {
    console.error(err.message);
  }

}




exports.listSubscriptions = listSubscriptions;
exports.applyInitialSubscriptions = applyInitialSubscriptions;
exports.addModifySubscription = addModifySubscription;
