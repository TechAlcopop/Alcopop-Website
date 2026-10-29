import Home_header from "../components/Home_header";
import WhoWeAre from "../components/WhoWeAre";
import WhyAlco from "../components/WhyAlco";
import Beat from "../components/Beat";
import Zars from "../components/Zars";
import PipeMajor from "../components/PipeMajor";
import ZarsStory from "../components/ZarsStory";

const Home = () => {
  return (
    <>
      <Home_header />
      <WhoWeAre />
      <PipeMajor />
       <Zars />
      <ZarsStory />
      <Beat />
      <WhyAlco />
    </>
  );
};

export default Home;