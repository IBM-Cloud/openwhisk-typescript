# IBM Cloud Functions Typescript Starter

A starter kit to build IBM Cloud Functions using:
- [Typescript](https://www.typescriptlang.org/)
- [Mocha](https://mochajs.org/)
- [Webpack](https://webpack.js.org/)
- [wskdeploy](https://github.com/apache/incubator-openwhisk-wskdeploy)

## Why a starter kit

1. Many serverless examples use plain Javascript. While this is great for getting started, projects that grow in size are likely to require better type checking to prevent errors. An example is that every Cloud Function has a `main()` that accepts an object. It would be helpful to not only define the semantics of the incoming object but also enforce this during development. Even small microservices will benefit from identifying that the `id` you thought was `string` is really a `number`. And you'll want to use ES6 improvements. This is why [Typescript](https://www.typescriptlang.org/) is used.

2. Unit testing might be new to you. Typescript might be new to you. And if both are new to you, that's OK. Provided are examples of testing Cloud Functions using [Mocha](https://mochajs.org/). Tests are executed using `npm run test`, which uses the [ts-node](https://github.com/TypeStrong/ts-node) utility for easy execution - no need to build. By using default exports, you can import your action and conveniently test `main()`.

3. Organizing and deploying multiple actions can be confusing to the newcomer. Let's assume you've written a microservice with just two actions: **Bold** and **Strikethrough**. Both actions depends on a shared utility called **Messenger**.
When the **Bold** and **Strikethrough** actions are deployed, the serverless runtime is not aware of external code like **Messenger**. So you cleverly package **Messenger** as a module and then require this module in **Bold** and **Strikethrough**. First, this is more work. But more importantly, **Messenger** is a custom module and Cloud Functions natively supports a [subset of NPM modules available](https://console.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_ref_javascript_environments_8), and you'll need to follow [packaging an action as a Node.js module](https://console.bluemix.net/docs/openwhisk/openwhisk_actions.html#openwhisk_js_packaged_action) to deliver it to Cloud Functions. Unfortunately this process results in a module that can only export one action - the one defined by `main` in `package.json`. So our project which once contained **Bold** and **Strikethrough** now needs to be two projects?!?.
The solution to this scenario is [Webpack](https://webpack.js.org/). Now you can import **Messenger** and rely on webpack to package it. Additionally, you can write multiple actions that are contained in a single project. If webpack is new to you, a webpack.config.js is provided and action samples have required boilerplace like `(<any>global).main = main;`. It also excludes those natively supported NPM modules from the final bundle.

4. Being declarative about deployment doesn't mean you have to write your own shell scripts. Just use [wskdeploy](https://github.com/apache/incubator-openwhisk-wskdeploy). The manifest.yaml has been structured to work with webpack output and deploys two APIs for the sample actions.

## Project structure

├── dist - Typescript output
├── dist-webpack - Webpack output (i.e. Cloud Function actions)
├── manifest.yaml - wskdeploy manifest
├── package-lock.json
├── package.json
├── src
│   ├── Bold.ts - Action sample
│   ├── Messenger.ts - Dependency sample
│   ├── Params.ts - Config/input parameters
│   └── Strikethrough.ts - Action sample
├── test
│   └── functionsTest.ts - Unit tests
├── tsconfig.json - Typescript config
└── webpack.config.js - Webpack config

## Using the starter

1. Run `npm run bundle && npm run deploy`.
2. Get the [starter-apis route](https://console.bluemix.net/openwhisk/apimanagement).
3. In a browser, request `https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/<your API Gateway>/api/bolded?message=hello`.

## Coding, test, deploy, run

A general development pattern to create, test and deploy new actions is the following.

1. Create a new Typescript action file in `/src` similar to the samples provided.
2. Import your action in `/test/functionsTest.ts`. Write your unit test and test using `npm run test`.
3. Add `YourAction: ./src/YourAction.ts',` to webpack.config.js's `entry` property.
4. Run `npm run bundle` to bundle the Javascript.
6. Optionally add any default package properties in the `inputs` stanza of manifest.yaml.
7. Login to IBM Cloud `ibmcloud login`.
8. Run `npm run deploy` or use `wskdeploy` directly. (Just don't forget to install wskdeploy from [here](https://github.com/apache/incubator-openwhisk-wskdeploy/releases)).
