'use client';

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <div>
      <button
        type='button'
        className={amount < 2 ? "opacity " : undefined}
        onClick={decrease}
      >
        <span>-</span>
      </button>
      <span>{amount}</span>
      <button type='button' onClick={increase}>
        <span>+</span>
      </button>
    </div>
  );
};


export default AmountButtons;