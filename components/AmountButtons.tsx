'use client';
import Button from "./Button";

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={decrease}
      >
        <span>-</span>
      </Button>
      <span>{amount}</span>
      <Button 
        onClick={increase}>
        <span>+</span>
      </Button>
    </div>
  );
};


export default AmountButtons;