# IBM Cloud Functions TypeScript Starter

A starter kit to build IBM Cloud Functions using:
- [TypeScript](https://www.TypeScriptlang.org/)
- [Mocha](https://mochajs.org/)
- [Webpack](https://webpack.js.org/)
- [wskdeploy](https://github.com/apache/incubator-openwhisk-wskdeploy)

## Why a starter kit

1. Many serverless examples use native Javascript, but as projects grow in size, better type checking and code modularity is needed. This is why Typescript was chosen for the starter. Consider the Cloud Functions entry point `main(params)`. Is the `params.id` property a string or a number? With Typescript you can make this explicit and leverage ES6 syntactic sugar and range of additional programming constructs.

2. Unit testing might be new to you. Or Typescript might be new to you. And if both are new to you, that’s OK. Provided in the starter are examples of testing Cloud Functions using [Mocha](https://mochajs.org/). Tests are executed using npm run test, which uses the [ts-node](https://github.com/TypeStrong/ts-node) utility to quickly test without having to build.

3. The starter kit uses [webpack](https://webpack.js.org/) to organize code. By using webpack you can write multiple actions that are contained in a single project. And any external dependencies used by your actions, will be packaged for you automatically. A working webpack.config.js is provided and sample actions declare `(global).main = main;` to make them compatible. Additionally, the starter will exclude any natively supported NPM modules from the final bundle.

4. Finally, being declarative about deployment doesn’t mean writing complicated shell scripts. Simply use [wskdeploy](https://github.com/apache/incubator-openwhisk-wskdeploy). A sample manifest.yaml has been structured to work with webpack and deploys two APIs. See the wskdeploy [documentation](https://github.com/apache/incubator-openwhisk-wskdeploy/tree/master/docs) for more deployment options.

## Project structure

```
├── dist - TypeScript and webpack output
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
├── tsconfig.json - TypeScript config
└── webpack.config.js - Webpack config
```

## Before you begin
1. Install wskdeploy from [here](https://github.com/apache/incubator-openwhisk-wskdeploy/releases).
2. Install [Node.js](https://nodejs.org/).

## Using the starter

1. Run `npm run deploy`.
2. Get the [starter-apis route](https://console.bluemix.net/openwhisk/apimanagement).
3. In a browser, request `https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/<your API Gateway>/api/bolded?message=hello`.

## Coding, test, deploy, run

A general development pattern to create, test and deploy new actions is the following.

1. Create a new TypeScript action file in `/src` similar to the samples provided.
2. Import your action in `/test/functionsTest.ts`. Write your unit test and test using `npm run test`.
3. Add `YourAction: './src/YourAction.ts',` to webpack.config.js's `entry` property.
4. Run `npm run bundle` to bundle the JavaScript.
6. Optionally add any default package properties in the `inputs` stanza of manifest.yaml.
7. Login to IBM Cloud `ibmcloud login`.
8. Run `npm run deploy` or use `wskdeploy` directly.

## FAQ

### Why webpack?
Let's assume you've created a project (a microservice) with just two actions: **Bold** and **Strikethrough**. Both actions depend on a shared utility, **Messenger**, which is also contained in your project. Despite everything being in the same project,
running **Bold** and **Strikethrough** as actions will fail because the serverless runtime is not aware of "external" code like **Messenger**. To work around this, you cleverly package **Messenger** as a module and then require this module in **Bold** and **Strikethrough**. First, this is more work. But more importantly, **Messenger** is a custom module and Cloud Functions only natively supports a [subset of NPM modules](https://console.bluemix.net/docs/openwhisk/openwhisk_reference.html#openwhisk_ref_JavaScript_environments_8). Again, you cleverly try to follow [package your actions as a Node.js module](https://console.bluemix.net/docs/openwhisk/openwhisk_actions.html#openwhisk_js_packaged_action) and deliver it to Cloud Functions. Unfortunately the NPM packaging process results in a module that can only export one action, the one defined by `main` in `package.json`. So the project which once contained **Bold** and **Strikethrough** now needs to be two projects?!?
The solution to this scenario is webpack.