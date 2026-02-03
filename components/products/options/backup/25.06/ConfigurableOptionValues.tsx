import type { ConfigurableProductOptionValueType } from '@/lib/queries/getProductDetails';
import { SelectedConfigurableProductOptions, HandleSelectConfigurableOption } from '@/types/product';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";

type Props = {
 values: ConfigurableProductOptionValueType[],
 optionCode: string,
 selectedIndex: number,
 handleSelectConfigurableOption: HandleSelectConfigurableOption
};

export const ConfigurableOptionValues = ({
    values, 
    selectedIndex, 
    handleSelectConfigurableOption,
    optionCode}: Props) => {

  
  const renderValue = (value: ConfigurableProductOptionValueType) => {
    const selected = selectedIndex === value.value_index;
    // console.log('value',value)
    switch (value.swatch_data.__typename) {
      case 'ColorSwatchData': {
        return (
          <>
           <button 
            key={value.uid}
            type="button"
            className="relative inline-flex items-center justify-center w-12 h-12 border-2 border-black"
            style={{ backgroundColor: value.swatch_data.value }}
            onClick={() => handleSelectConfigurableOption(optionCode, value.value_index)}
            >
            {selected && (
              <span className="absolute flex items-center justify-center w-full h-full">
                <FaCheck style={{ color: 'white' }} />
              </span>
            )}
          </button>
        </>

        )
      }
      case 'TextSwatchData': {
        return (
          <>
            <button 
              key={value.uid}
              type="button"
             className={`flex items-center justify-center w-12 h-12 mr-2 border-2 border-black ${
              selected ? 'bg-black text-white' : 'bg-transparent text-black'
            }`}
              onClick={() => handleSelectConfigurableOption(optionCode, value.value_index)}
             >
                <span>{value.swatch_data.value}</span>
            </button>
          </>
        )
      }
      default: {
        return null
      }
    }   
  }

  return (
    <div>
      {values.map(value => (
        <span key={value.uid}> {/* Ensure this key is unique */}
          {renderValue(value)}
        </span>
      ))}
    </div>
  )
}
