import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import logo from "./assets/luffy.jpg";

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="content">
      <img
        src={logo}
        alt="Luffy"
        className={`center-image ${theme}`}
      />
    </div>
  );
};

export default Content;
