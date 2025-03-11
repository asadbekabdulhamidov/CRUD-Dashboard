//rrd
import { Outlet } from "react-router-dom";
//compoents

import { Navbar, Sidebar } from "../components";
function MainLayout() {
  return (
    <div className="flex h-screen">
      <aside>
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="w-full">
          <Navbar />
        </header>
        <main className="p- flex-1 overflow-auto">
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default MainLayout;

{
  /* <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <header className="mb-4">
          <Navbar />
        </header>
        <main>
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>
        </main>
        <footer></footer>
      </div>
    </div> */
}
