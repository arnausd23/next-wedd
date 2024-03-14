import "./App.css";
import Navbar from "./components/Navbar";
import Contact from "./sections/Contact";
import Gallery from "./sections/Gallery";
import Home from "./sections/Home";
import Information from "./sections/Information";
import JoinUs from "./sections/JoinUs";
import Timeline from "./sections/Timeline";
import Timer from "./sections/Timer";
import "./services/fetchData";

function App() {
  return (
    <main>
      <Navbar />
      <Home />
      <JoinUs />
      <Timeline />
      <Timer />
      <Information />
      <Contact />
      <Gallery />
    </main>
  );
}

export default App;
