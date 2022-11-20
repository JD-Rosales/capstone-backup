import "./TextToASL.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightNav from "../../components/RightNav/RightNav";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { images as rightImages } from "../../util/rightImages";
import { images as leftImages } from "../../util/LeftImages";

const TextToASL = () => {
  const { user } = useSelector((state) => state.auth);

  const [handImage, setHandImage] = useState([]);
  const [renderedImages, setRenderedImages] = useState([]);
  const [input, setInput] = useState("");

  const redenASL = () => {
    const images = renderedImages.map((item, i) => {
      return <img key={i} src={item} alt="ASL" />;
    });

    return images;
  };

  useEffect(() => {
    const letterArr = [...input];

    const imgArr = letterArr.map((item) => {
      let img;
      for (let i = 0; i < handImage.length; i++) {
        if (item === handImage[i].name) {
          img = handImage[i].image;
          break;
        }
      }
      return img;
    });
    setRenderedImages(imgArr);
    // eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    const alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    if (user.userSettings.hand) {
      const images = alphabets.map((item, i) => {
        return { name: item, image: Object.values(rightImages)[i] };
      });
      setHandImage(images);
    } else {
      const images = alphabets.map((item, i) => {
        return { name: item, image: Object.values(leftImages)[i] };
      });
      setHandImage(images);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="text-asl">
      <Sidebar />

      <main>
        <span className="char-length">
          Character Length:{" "}
          <span style={{ color: "var(--aquaGreen)", fontWeight: 600 }}>
            {renderedImages.length}
          </span>
        </span>

        <div className="img-container">{redenASL()}</div>

        <div className="input-container">
          <span style={{ fontSize: ".9rem" }}>Input Here:</span>
          <br />

          <input
            type="text"
            onChange={(e) => {
              const regex = /^$|^[A-Za-z]+$/;
              if (e.target.value.match(regex) && e.target.value.length <= 24) {
                setInput(e.target.value.toUpperCase());
              }
            }}
            value={input}
            placeholder="Text here..."
          ></input>
        </div>
      </main>

      <RightNav
        header="TEXT"
        coloredText="TO ASL"
        text="Type your text below and it will be automatically converted to Sign Language"
      />
    </div>
  );
};

export default TextToASL;
