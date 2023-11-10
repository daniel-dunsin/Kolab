import { RouterProvider } from "react-router-dom";
import routes from "./pages/router";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";
import Preloader from "./components/ui/Preloader";
import ErrorModal from "./components/ui/ErrorModal";
import CreateWorkspaceModal from "./components/modals/CreateWorkspaceModal";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Preloader />
        <ErrorModal />
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
