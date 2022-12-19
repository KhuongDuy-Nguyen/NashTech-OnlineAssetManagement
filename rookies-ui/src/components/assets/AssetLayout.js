import { Outlet } from "react-router-dom";
import AssetProvider from "../../contexts/providers/AssetProvider";

const AssetLayout = (props) => {
  return (
    <AssetProvider>
      <Outlet />
    </AssetProvider>
  );
};

export default AssetLayout;
