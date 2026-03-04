import Navbar from "../navbar/Navbar";
import ProgressSidebar from "../progress/ProgressSidebar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-frame">
          <div className="inner-layout">{children}</div>
        </div>
      </div>
    </>
  );
}
