import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from "styled-components";

import App from "./App";
import theme from "./theme";
import GlobalStyles from "./globalStyles";
import FontStyles from "./fonts/fontStyles";
import {store} from "./app/store";
import {Provider} from "react-redux";

const $rootElem = document.getElementById("root");

if ($rootElem) {
  const root = ReactDOM.createRoot($rootElem);

  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <FontStyles/>
      <Router>
        <Provider store={store}>
          <App/>
        </Provider>
      </Router>
    </ThemeProvider>
  );
}
