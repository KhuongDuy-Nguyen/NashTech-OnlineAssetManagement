import CreateAsset from "../components/assets/create-asset/CreateAsset";
import CreateAssetProvider from "../contexts/providers/CreateAssetProvider";

const CreateAssetPage = props => {
  return (
    <CreateAssetProvider>
      <CreateAsset />    
    </CreateAssetProvider>
  )
}

export default CreateAssetPage;