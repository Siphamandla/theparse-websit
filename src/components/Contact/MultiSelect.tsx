import React from "react";
import Select from "react-select";
import { ClearIndicator } from "./ClearIndicator";
//https://codesandbox.io/s/react-select-multiselect-with-material-ui-tooltip-for-clear-indicator-ky133?file=/src/App.js:631-682

const Multiselect = ({ selected, setSelected, options , labelname, Iwidth, placeholder}) => {
  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };
  const customStyles = {
    indicatorSeparator: () => {}
  };
  return (
    <div style={{ 'width':Iwidth }}>
      <Select
      isMulti
      label={labelname}
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