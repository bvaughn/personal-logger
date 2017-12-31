Try it out by signing in with your Github or Twitter account at [personal-logger.now.sh](https://personal-logger.now.sh/).

## Local Installation

This application was built with [`create-react-app`](https://github.com/facebookincubator/create-react-app). To run it locally, clone this repository and then:
```
yarn install
yarn start
```

## Firestore Configuration

### Indexes

This application relies on a single collection, "entries", with a single index on the following fields:
* user, ascending
* \`$category\`, ascending
* date, descending

### Rules

Security for this application relies on the following rules:
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Authenticated users can access data that is explicitly associated with them.
      allow read, update, delete: if  request.auth.uid != null &&
                                      request.auth.uid == resource.data.user;

      // Authenticated users can create new records.
      allow create: if request.auth.uid != null;
    }
  }
}
```
