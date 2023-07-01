import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import useAuthCheck from "./hooks/useAuthCheck";
import "./index.css";

// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// i18n (needs to be bundled)
import "./i18n";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

// Redux
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
);
