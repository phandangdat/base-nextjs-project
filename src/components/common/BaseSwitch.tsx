import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseSwitchProps<TFormValues extends FieldValues> extends Omit<SwitchProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  label?: string;
}

export const BaseSwitch = <TFormValues extends Record<string, any>>(props: BaseSwitchProps<TFormValues>) => {
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
      control={<Switch {...restProps} onChange={onChange} checked={value} onBlur={onBlur} ref={ref} name={fieldName} />}
    />
  );
};
