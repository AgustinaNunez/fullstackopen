import { ReactNode } from "react";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import styles from './styles';

type MultipleSelectProps = {
  value: string[], 
  placeholder: string, 
  onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void, 
  list: string[]
};
const MultipleSelect: React.FC<MultipleSelectProps> = ({value, placeholder, onChange, list}) => {
  const Placeholder = () => 
    <Typography>{placeholder}</Typography>;
  
  return (
    <FormControl sx={styles.formControl}>
      <Typography variant="body1" sx={styles.label}>
        {placeholder}
      </Typography>
      <Select
        multiple
        displayEmpty
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        input={<Input size="small" fullWidth />}
        renderValue={(selected) => {
          return selected.length === 0
            ? <Placeholder />
            : selected.join(', ');
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <Placeholder />
        </MenuItem>
        {list.map((element) =>
          <MenuItem key={element} value={element}>
            {element}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;