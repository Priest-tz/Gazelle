import React from "react";

const SizePicker = ({ sizes, selectedSize, handleSizeChange }) => {
  return (
    <div className="sizePicker">
      <span>Size:</span>
      {sizes.map((size, index) => (
        <button
          key={index}
          className={selectedSize === size ? "selected" : ""}
          onClick={() => handleSizeChange(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizePicker;
