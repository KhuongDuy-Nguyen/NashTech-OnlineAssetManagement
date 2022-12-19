import EditAsset from "../components/assets/edit-asset/EditAsset";
import EditAssetProvider from "../contexts/providers/EditAssetProvider";

const EditAssetPage = props => {
  return (
    <EditAssetProvider>
      <EditAsset />    
    </EditAssetProvider>
  )
}

export default EditAssetPage;