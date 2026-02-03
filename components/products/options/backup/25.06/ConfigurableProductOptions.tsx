import { ConfigurableProductOptionsType } from '@/lib/queries/getProductDetails';
import { SelectedConfigurableProductOptions, HandleSelectConfigurableOption } from '@/types/product';
import { ConfigurableOptionValues } from './ConfigurableOptionValues'

type Props = {
  options: ConfigurableProductOptionsType[];
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectConfigurableOption: HandleSelectConfigurableOption;
};

export const ConfigurableProductOptions = ({
  options,
  selectedConfigurableProductOptions,
  handleSelectConfigurableOption
}: Props) => {

  const renderOption = (option: ConfigurableProductOptionsType) => {
    return (
     <div key={option.attribute_code} className="mb-4">
      <div className="px-4 py-2 font-bold">{option.label}</div>
      <ConfigurableOptionValues
        values={option.values}
        optionCode={option.attribute_code}
        selectedIndex={selectedConfigurableProductOptions[option.attribute_code]}
        handleSelectConfigurableOption={handleSelectConfigurableOption}
      />
    </div>
    )
  //   return (
  //     <div key={uid}>
  //       <div className='px-15'>{option.label}</div>
  //       <ConfigurableOptionValues 
  //         values={option.values}
  //         optionCode={option.attribute_code}
  //         selectedIndex={selectedConfigurableProductOptions[option.attribute_code]}
  //         handleSelectConfigurableOption={handleSelectConfigurableOption}
  //         />
  //   </div>
  //  )
  };

  return (
    <div>
      {options.map(option => renderOption(option))}
    </div>
  )
}