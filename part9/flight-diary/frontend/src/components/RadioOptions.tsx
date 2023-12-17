type RadioOptionsProps = {
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
};
const RadioOptions = ({ name, options, selectedValue, onChange }: RadioOptionsProps) => {
  return (
    <>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </>
  );
};

export default RadioOptions;
