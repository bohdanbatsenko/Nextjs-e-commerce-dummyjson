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

  const renderOption = (option: ConfigurableProductOptionsType, uid: number) => {
    return (
      <div key={uid}>
        <div className='px-15'>{option.label}</div>
        <ConfigurableOptionValues 
          values={option.values}
          optionCode={option.attribute_code}
          selectedIndex={selectedConfigurableProductOptions[option.attribute_code]}
          handleSelectConfigurableOption={handleSelectConfigurableOption}
          />
    </div>
   )
  }

  return (
    <div>
      {options.map((option, index) => {
        return (renderOption(option, index))
        // <ConfigurableOption key={option.values[0].uid} option={option}/>
      })}
    </div>
  )
}