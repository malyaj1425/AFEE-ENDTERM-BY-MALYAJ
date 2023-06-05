import FunnyQuotes from "../FunnyQuotes/page";
import "./page.css";

export default function Banner() {
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  return (
    <div className="banner">
      <div className="bgimg"></div>
      <div className="bcards">
        <div className="bcard1">CARD1</div>
        <div className="bcard2">CARD2</div>
        <div className="bcard3 text-6xl font-bold text-center bg-blue-500 p-4">
          <h1 className="hyperplexed">"Nourishing the Intellect, Fostering Dialogue"</h1>
        </div>
      </div>
      <div className="btext"></div>
    </div>
  );
}
