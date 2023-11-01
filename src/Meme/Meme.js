import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ShowMemes } from "../YourMemes/ShowMemes";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const history = useHistory();
  //useHistory does a great job of showcasing React Hooks by separating access to the react-router history object into a cross-cutting concern and replaces the previous cumbersome access via higher-order components or render-props that are now a thing of the past.

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);
  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append("username", "surya112");
    formData.append("password", "omar@112233");
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        storeMeme(res.data.url);
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };
  const storeMeme = (memeurl) => {
    let memeArray = [];
    const memeArrayjson = localStorage.getItem("memeArray");

    if (memeArrayjson) {
      memeArray = JSON.parse(memeArrayjson);
    }

    memeArray.push(memeurl);
    localStorage.setItem("memeArray", JSON.stringify(memeArray));
  };

  return memes.length ? (
    <div className={styles.container}>
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaption(e, index)} key={index} />
      ))}
      <img alt="meme" src={memes[memeIndex].url} />
      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            memeIndex !== 0
              ? setMemeIndex(memeIndex - 1)
              : setMemeIndex(memeIndex);
          }}
          className={styles.previous}
        >
          Previous
        </button>
        <button onClick={generateMeme} className={styles.generate}>
          Generate
        </button>

        <button
          onClick={() => setMemeIndex(memeIndex + 1)}
          className={styles.skip}
        >
          skip
        </button>
      </div>
      <Link to="/generated-memes" style={{ textDecoration: "none" }}>
        <button className={styles.memes}>Your Memes</button>
      </Link>
    </div>
  ) : (
    <></>
  );
};
