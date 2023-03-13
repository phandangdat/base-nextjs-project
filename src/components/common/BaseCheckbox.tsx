import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseCheckboxProps<TFormValues extends FieldValues> extends Omit<CheckboxProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  label?: string;
}

export const BaseCheckbox = <TFormValues extends Record<string, any>>(props: BaseCheckboxProps<TFormValues>) => {
  const { name, control, rules, label, ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox {...restProps} onChange={onChange} checked={value} onBlur={onBlur} ref={ref} name={fieldName} />
      }
    />
  );
};
