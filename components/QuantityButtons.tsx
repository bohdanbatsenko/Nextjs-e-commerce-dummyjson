'use client';
import Button from "./Button";

const QuantityButtons = ({ increase, decrease, quantity }) => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={decrease}
      >
        <span>-</span>
      </Button>
      <span>{quantity}</span>
      
      <Button 
        onClick={increase}>
        <span>+</span>
      </Button>
    </div>
  );
};


export default QuantityButtons;