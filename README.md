https://www.twilio.com/blog/how-to-build-a-cli-with-node-js

https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89

First 
```
npx netlify login
```

```
npm install -g firebase-tools
```

Use Netlify CLI

Add Firebase secrets to Netlify
	- Manual - must link to Netlify
	- Can use get secrets to verify

	
Requires Vercel Integration
https://vercel.com/docs/integrations/create-integration

Create github project for user
	- https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes

Link project to Vercel and add secrets
	- https://vercel.com/docs/integrations/reference#using-the-vercel-api/interacting-with-vercel-projects

Deploy



# Firebase Auth & Firestore

This project demonstrates how to use Firebase (Auth and Firestore) with Remix.

## Preview

See the screen recording at `./screen_recording.gif` or Open this example on [CodeSandbox](https://codesandbox.com):

<!-- TODO: update this link to the path for your example: -->

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/remix-run/remix/tree/main/examples/firebase-auth-firestore)

## Example

To run it, you need to either:

### 1. Run against a Firebase Project

1. [Create a Firebase Project](https://console.firebase.google.com)
2. Enable Auth (with email) and Firestore
3. Add a Web App
4. Get the [admin-sdk](https://firebase.google.com/docs/admin/setup#initialize-sdk) and [Web API Key](https://firebase.google.com/docs/reference/rest/auth)
5. Save them to SERVICE_ACCOUNT and API_KEY in the `.env`-file

### 2. Use the Firebase emulators

1. Run `npm run emulators` in one terminal window
2. Run `npm run dev` in a second

When the SERVICE_ACCOUNT and CLIENT_CONFIG environment variables have not been set, `npm run dev` will default to using the local emulator.

When you run `npm run emulators`, an initial user is created with credentials `user@example.com:password`. This can be configured in `firebase-fixtures/auth/accounts.json` or via the emulator UI.

## Auth (`app/server/auth.server.ts`)

`signIn` returns a Firebase session-cookie-string, when sign-in is successfull. Then Remix `cookieSessionStorage` is used to set, read and destroy it.

`signUp` creates a user and calls sign-in to receive the session cookie.

`requireAuth` uses `firebase-admin` to verify the session cookie. When this check fails, it throws a `redirect` to the login page. Use this method to protect loaders and actions. The returned `UserRecord` can be handy to request or manipulate data from the Firestore for this user.

## Firestore (`app/server/db.server.ts`)

Requests to the Firestore are made using the `firebase-admin`-SDK. You need to check validity of your requests manually, since `firestore.rules` don't apply to admin requests.

`converter` and `datapoint` are utilities to allow typed Firestore data reads and writes.

## Deploy to Netlify

Install the Netlify CLI globally

```npm i -g netlify-cli```

## Set Custom Auth Email Templates

Customize the action link URL:
https://support.google.com/firebase/answer/7000714?authuser=0&hl=en#actionlink

## Links

- [Firestore Data Converters](https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter) for typing
- [Firebase Session Cookies](https://firebase.google.com/docs/auth/admin/manage-cookies)
- [Remix `cookieSessionStorage`](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
