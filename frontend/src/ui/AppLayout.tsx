import { Outlet } from "react-router";

const AppLayout: React.FC = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default AppLayout;
