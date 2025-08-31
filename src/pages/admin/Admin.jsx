import { AuthContext } from "../../../AuthContext";
import { useContext, useState } from "react";
export default function Admin() {
  const { isAdmin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  if (!isAdmin) {
    setError("Access denied. Error Code : 401");
  }
  return <>{error && <h2>error</h2>}</>;
}
