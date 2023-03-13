import { Option } from '@/models';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
interface BaseSelectProps<TFormValues extends FieldValues>
  extends Omit<
    AutocompleteProps<any, boolean | undefined, boolean | undefined, boolean | undefined, React.ElementType>,
    'name' | 'renderInput'
  > {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
}
export const BaseSelectTwo = <TFormValues extends Record<string, any>>(props: BaseSelectProps<TFormValues>) => {
  const { name, control, rules, label, variant = 'outlined', multiple, ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <Autocomplete
      multiple={multiple}
      {...restProps}
      onChange={
        multiple
          ? (_, data) => {
              onChange(data.map((item: Option) => item.value));
            }
          : onChange
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          onBlur={onBlur}
          value={value}
          inputRef={ref}
          label={label}
          name={fieldName}
          error={!!error}
          helperText={error?.message} // Fix different height by passing a space character to the helperText prop
        />
      )}
    />
  );
};
