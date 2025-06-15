import { useContext } from "react";
import { ContentContext } from "../component/context/ContentContext";

const useContent = () => useContext(ContentContext);

export default useContent;