import { Option } from '@/models';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps, Tooltip } from '@mui/material';
import { ChangeEvent } from 'react';
import { Control, FieldPath, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

interface BaseCheckboxGroupProps<TFormValues extends FieldValues> extends Omit<CheckboxProps, 'name'> {
  name: Path<TFormValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<TFormValues>;
  choices: Array<Option>;
  formControlLabelProps: Omit<FormControlLabelProps, 'label' | 'control'>;
  checkboxAlign?: 'horizontal' | 'vertical';
}

export const BaseCheckboxGroup = <TFormValues extends Record<string, any>>(
  props: BaseCheckboxGroupProps<TFormValues>,
) => {
  const { name, control, rules, choices, formControlLabelProps, checkboxAlign = 'horizontal', ...restProps } = props;
  const {
    field: { onBlur, onChange, ref, value, name: fieldName },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Box display='flex' flexDirection={checkboxAlign === 'horizontal' ? 'column' : 'row'}>
      {choices.map((choice) => (
        <FormControlLabel
          {...formControlLabelProps}
          label={
            <Box display='flex' justifyContent='flex-start' alignItems='center'>
              {choice.label}
              {choice.description && (
                <Tooltip title={choice.description}>
                  <ErrorOutline fontSize='small' />
                </Tooltip>
              )}
            </Box>
          }
          key={choice.value}
          control={
            <Checkbox
              {...restProps}
              onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
                if (checked) return onChange([...value, event.target.value]);
                onChange(value.filter((value: string) => value !== event.target.value));
              }}
              value={choice.value}
              checked={value?.some((existingValue: string) => existingValue === choice.value)}
              onBlur={onBlur}
              ref={ref}
              name={fieldName}
            />
          }
        />
      ))}
    </Box>
  );
};
