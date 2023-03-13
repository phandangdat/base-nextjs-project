import { TextField } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseDatePickerProps<TFormValues extends FieldValues>
  extends Omit<DatePickerProps<unknown, unknown>, 'name' | 'onChange' | 'value' | 'renderInput'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
}

export const BaseDatePicker = <TFormValues extends Record<string, any>>(props: BaseDatePickerProps<TFormValues>) => {
  const { name, control, rules, mask = '____/__/__', inputFormat = 'YYYY/MM/DD', ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <DatePicker
      {...restProps}
      mask={mask}
      inputFormat={inputFormat} // dayjs format
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField ref={ref} name={fieldName} onBlur={onBlur} {...params} error={!!error} helperText={error?.message} />
      )}
    />
  );
};
