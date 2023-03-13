import { TextField, TextFieldProps } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseInputProps<TFormValues extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
}

export const BaseInput = <TFormValues extends Record<string, any>>(props: BaseInputProps<TFormValues>) => {
  const { name, control, rules, variant = 'outlined', children, ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...restProps}
      variant={variant}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      name={fieldName}
      inputRef={ref}
      error={!!error}
      helperText={error?.message} // Fix different height by passing a space character to the helperText prop
    >
      {children}
    </TextField>
  );
};
