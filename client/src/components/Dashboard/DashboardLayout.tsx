import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { getMyWorkspaces } from "../../services/thunks/workspace.thunk";

interface Props {
  pageTitle: string;
  children?: React.ReactElement | React.ReactElement[];
}

const DashboardLayout = ({ pageTitle, children }: Props) => {
  const [sidebarOpened, setSidebarOpened] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyWorkspaces());
  }, [window?.location.pathname]);

  return (
    <main className="h-screen bg-[#f4f3f3] w-full overflow-hidden">
      <Sidebar toggleSidebar={setSidebarOpened} isOpened={sidebarOpened} />
      <section className="h-screen ml-0 lg:ml-[300px]">
        <Navbar pageTitle={pageTitle} toggleSidebar={setSidebarOpened} />

        <section
          className="p-[1rem]"
          style={{
            maxHeight: "calc(100vh - 86px)",
            minHeight: "calc(100vh - 86px)",
            overflowY: "scroll",
          }}
        >
          <h1 className="text-[1.2rem] font-bold text-mainBlack lg:hidden">
            {pageTitle}
          </h1>

          <section>{children}</section>
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
