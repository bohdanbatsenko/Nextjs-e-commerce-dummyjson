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
  //const [selectedIndex, setSelectedIndex] = useState(-1);
  const renderValue = (value: ConfigurableProductOptionValueType, index:number) => {
    const selected = selectedIndex === index;

    switch (value.swatch_data.__typename) {
      case 'ColorSwatchData': {
        return (
          <>
           <button 
            key={value.uid}
            type="button"
            className='relative gap-4 inline-flex items-center justify-center pr-2' 
            onClick={() => handleSelectConfigurableOption(optionCode, index)}
            >
            <span
              key={value.uid}
              className=' w-12 h-12 gap-4 border-2 border-black' 
              style={{backgroundColor: value.swatch_data.value}}> 
            </span>
            {selected 
              ? (
                <span className='absolute flex items-center justify-center z-10'>
                  <FaCheck style={{ color: 'white' }}/>
                </span>
                
              )
              : null
            }
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
               className='flex justify-center items-center text-black inline-flex w-12 h-12 mr-2 border-2 border-black'
               style={{background: selected ? 'black' : 'white'}}
              onClick={() => handleSelectConfigurableOption(optionCode, index)}
             >
              <span 
                className='flex'
                style={{color: selected ? 'white' : 'black'}}
                >{value.swatch_data.value}</span>
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
      {values.map((value, index) => (
        <span key={index}>
          {renderValue(value, index)}
        </span>
          
        ))}
    </div>
  )
}