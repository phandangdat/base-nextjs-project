import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseRadioGroupProps<TFormValues extends FieldValues> extends Omit<RadioGroupProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  label?: string;
  choices: Array<{ value: any; label: string }>;
  onChange?: () => void;
}

export const BaseRadioGroup = <TFormValues extends Record<string, any>>(props: BaseRadioGroupProps<TFormValues>) => {
  const { name, control, rules, choices, onChange, ...restProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl style={{ display: 'flex' }} error={!!error}>
      <RadioGroup {...restProps} {...field}>
        {choices.map(({ label, value }: { value: any; label: string }) => (
          <FormControlLabel
            onChange={onChange}
            key={`radio-group-${value}`}
            label={label}
            value={value}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
