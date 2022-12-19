import ListAsset from "../components/assets/list-asset/ListAsset";
import ListAssetProvider from "../contexts/providers/ListAssetProvider";

const ListAssetPage = (props) => {
  return (
    <ListAssetProvider>
      <ListAsset />
    </ListAssetProvider>
  );
};
export default ListAssetPage;
