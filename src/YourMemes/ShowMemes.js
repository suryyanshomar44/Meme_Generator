import React from "react";

export const ShowMemes = () => {
  let memeArray = JSON.parse(localStorage.getItem("memeArray"));
  return (
    <div>
      <div>
        {memeArray.map((meme, index) => (
          <div key={index}>
            <img src={meme} alt="auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
