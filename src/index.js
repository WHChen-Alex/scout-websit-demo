import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./components/App";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { datadogRum } from "@datadog/browser-rum";
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://examplePublicKey@xx/0",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "my-project-name@2.3.12",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});
// datadogRum.init({
//   applicationId: "85ba2717-6f75-4167-b2e8-dd52e06f8fc4",
//   clientToken: "pub6125aec05682e84817caf2e46844043d",
//   // clientToken: "pubssdf22w24dsfs",
//   site: "datadoghq.com",
//   service: "alex-test-rum",

//   // Specify a version number to identify the deployed version of your application in Datadog
//   // version: '1.0.0',
//   sessionSampleRate: 100,
//   sessionReplaySampleRate: 20,
//   trackUserInteractions: true,
//   trackResources: true,
//   trackLongTasks: true,
//   defaultPrivacyLevel: "mask-user-input"
// });

// datadogRum.startSessionReplayRecording();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
