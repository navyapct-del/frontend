import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";
import { Account } from "./config/Account";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

function App() {
  return (
    <PostHogProvider client={posthog}>
      <Account>
        <RecoilRoot>
          <BrowserRouter>
            <Router />
            <ScrollToTop />
          </BrowserRouter>
        </RecoilRoot>
      </Account>
    </PostHogProvider>
  );
}

export default App;
