import React from "react";
import Select from "react-select";
import { ClearIndicator } from "./ClearIndicator";

const Multiselect = ({ selected, setSelected, options, labelname, Iwidth, placeholder }) => {
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  // Custom styles for react-select components
  const customStyles = {
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div style={{ width: Iwidth }}>
      {/* Render the label above the Select component */}
      {labelname && <label className="text-sm font-medium text-dark">{labelname}</label>}
      <Select
        isMulti
        isClearable={true}
        components={{ ClearIndicator }}
        defaultValue={selected}
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