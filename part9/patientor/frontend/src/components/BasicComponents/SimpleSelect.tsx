import { FormControl, Input, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

export type SimpleSelectOptionProp = { value: string; name: string };
type SimpleSelectProps = {
  value: string, 
  placeholder: string, 
  onChange: (event: SelectChangeEvent<string>) => void, 
  list: SimpleSelectOptionProp[]
};
const SimpleSelect: React.FC<SimpleSelectProps> = ({value, placeholder, onChange, list}) => {
  const Placeholder = () => 
    <Typography>{placeholder}</Typography>;
  
  return (
    <FormControl sx={{ margin: '0.5rem 0', width: '100%'}}>
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        input={<Input size="small" fullWidth />}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={selected => {
          const selectedName = list.find(el => el.value === selected)?.name;
          return selectedName || <Placeholder />;
        }}
      >
        <MenuItem disabled key="" value="">
          <Placeholder />
        </MenuItem>
        {list.map((element) =>
          <MenuItem key={element.value} value={element.value}>
            {element.name}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;