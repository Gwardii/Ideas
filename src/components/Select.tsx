import { CircularProgress, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';

type Option = {
  label?: string;
  value: string | number;
};

type BaseSelectProps = {
  name?: string;
  options: Option[];
  error?: React.ReactNode;
} & Omit<TextFieldProps, 'error'>;

export const BaseSelect = forwardRef<HTMLDivElement, BaseSelectProps>(
  ({ name, options, error, ...props }, ref) => {
    return (
      <TextField
        select
        name={name}
        error={Boolean(error)}
        helperText={error}
        {...props}
        inputRef={ref}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        {options.length === 0 ? (
          <MenuItem sx={{ justifyContent: 'center' }}>
            <CircularProgress size="1.5rem" />
          </MenuItem>
        ) : null}
      </TextField>
    );
  },
);

type SelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
} & Omit<BaseSelectProps, 'name' | 'error'>;

export const Select = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  defaultValue,
  disabled,
  ...props
}: SelectProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController({
    control,
    name: props.name,
    defaultValue,
  });
  options.map((option) => { option.label ??= option.value as string })

  return (
    <BaseSelect
      options={options}
      error={fieldState.error?.message}
      {...props}
      {...field}
      disabled={disabled}
      value={field.value ?? ''}
    />
  );
};
