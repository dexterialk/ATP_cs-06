import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import "./css/layers.css";
import "./css/tokens.css";
import "./css/base.css";
import "./css/pages.css";
import Layout from "./components/Layout";
import { bootPage } from "./js/main";

// Mounts a page inside the shared layout, then starts the page scripts.
export function mountPage(Page) {
  const root = createRoot(document.getElementById("root"));
  // Render synchronously so the scripts below find the page in the DOM.
  flushSync(() => {
    root.render(
      <Layout>
        <Page />
      </Layout>,
    );
  });
  bootPage();
}
