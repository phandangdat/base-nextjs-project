import { TextField } from '@mui/material';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseTimePickerProps<TFormValues extends FieldValues>
  extends Omit<TimePickerProps<unknown, unknown>, 'name' | 'onChange' | 'value' | 'renderInput'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
}

export const BaseTimePicker = <TFormValues extends Record<string, any>>(props: BaseTimePickerProps<TFormValues>) => {
  const { name, control, rules, ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <TimePicker
      {...restProps}
      value={value}
      onChange={onChange}
      ampm={false}
      renderInput={(params) => (
        <TextField
          ref={ref}
          name={fieldName}
          onBlur={onBlur}
          {...params}
          error={!!error}
          helperText={error?.message || ' '}
        />
      )}
    />
  );
};
