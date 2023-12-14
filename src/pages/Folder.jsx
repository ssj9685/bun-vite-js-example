import { localStorageUtil } from "~/utils/local-storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FolderPage = () => {
  const navigator = useNavigate();
  useEffect(() => {
    if (!localStorageUtil.accessToken.get()) {
      navigator("/");
    }
  }, [navigator]);

  const handleSignOut = () => {
    localStorageUtil.accessToken.delete();
    navigator("/sign-in");
  };

  return (
    <div>
      <div>this is folder page</div>
      <button onClick={handleSignOut}>logout</button>
    </div>
  );
};

export default FolderPage;
