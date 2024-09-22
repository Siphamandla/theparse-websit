import React from "react";
import Select from "react-select";
import { ClearIndicator } from "./ClearIndicator";

interface Option {
  value: string;
  label: string;
}

interface MultiselectProps {
  name?: string;
  className?: string;
  required?: boolean;
  options: Option[];
  selected: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
  labelname: string;
  Iwidth: string;
  placeholder: string;
}

const Multiselect: React.FC<MultiselectProps> = ({
  name,
  selected,
  setSelected,
  options,
  labelname,
  Iwidth,
  placeholder,
  className,
}) => {
  const onChange = (selectedOptions: Option[] | null) => {
    setSelected(selectedOptions || []); // Handle null case for clearing options
  };

  // Custom styles for react-select components
  const customStyles = {
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className={className} style={{ width: Iwidth }}>
      {/* Render the label above the Select component */}
      {labelname && (
        <label htmlFor={name} className="text-sm font-medium text-dark dark:text-white">
          {labelname}
        </label>
      )}
      <Select
        isMulti
        name={name}
        isClearable={true}
        components={{ ClearIndicator }}
        value={selected}
        styles={customStyles}
        onChange={onChange}
        options={options}
        isSearchable={true}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Multiselect;