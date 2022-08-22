import { ReactSVG } from "react-svg";
import "./BackgroundBubbles.css";
import Bubble from "../../asssets/backgroundEffects.svg";

const BackgroundBubbles = () => {
  return (
    <div className="background_container">
      <ReactSVG src={Bubble} className="bubble a" />
      <ReactSVG src={Bubble} className="bubble b" />
      <ReactSVG src={Bubble} className="bubble c" />
      <ReactSVG src={Bubble} className="bubble d" />
      <ReactSVG src={Bubble} className="bubble e" />
    </div>
  );
};

export default BackgroundBubbles;
