// @refresh reload
import { FileRoutes } from "@solidjs/start/router";
import { Router } from "@solidjs/router";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";
import { Suspense } from "solid-js";
import {
  cookieStorageManagerSSR,
  ColorModeProvider,
  ColorModeScript,
} from "@kobalte/core";
import "./app.css";

function getServerCookies() {
  "use server";
  const colorMode = getCookie("kb-color-mode");
  return colorMode ? `kb-color-mode=${colorMode}` : "";
}

export default function App() {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() : document.cookie
  );

  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <Suspense>{props.children}</Suspense>
          </ColorModeProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
