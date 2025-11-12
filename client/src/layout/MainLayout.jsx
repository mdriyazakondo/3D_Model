import { Outlet } from "react-router";
import NavBar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-[1500px] mx-auto">
        <NavBar />
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
