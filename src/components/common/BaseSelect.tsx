import { Option } from '@/models';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
interface BaseSelectTwoProps<TFormValues extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  options: Array<Option>;
}
export const BaseSelect = <TFormValues extends Record<string, any>>(props: BaseSelectTwoProps<TFormValues>) => {
  const { name, control, rules, label, options, ...restProps } = props;
  const {
    field: { onBlur, onChange, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <TextField
      select
      {...restProps}
      onBlur={onBlur}
      label={label}
      onChange={onChange}
      value={value || ''}
      name={fieldName}
      fullWidth
      error={!!error}
      helperText={error?.message}
    >
      {options.map((e) => (
        <MenuItem key={e.value} value={e.value}>
          {e.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
