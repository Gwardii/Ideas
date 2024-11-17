import { TextField as MUITextField } from '@mui/material';
import { get, useFormContext, useWatch } from 'react-hook-form';

type TextFieldProps = React.ComponentPropsWithoutRef<typeof MUITextField> & {
  name: string;
  renderEndAdornment?: (params: { value: string }) => React.ReactNode;
};
export const TextField = ({
  name,
  helperText,
  renderEndAdornment,
  ...props
}: TextFieldProps) => {
  const { register, getValues, formState } = useFormContext();
  const value: string = useWatch({ name }) ?? getValues(name) ?? '';
  const error = get(formState.errors, name);

  const inputProps = {
    ...props.inputProps,
    // https://mui.com/material-ui/react-text-field/#type-quot-number-quot
  };

  const InputProps = renderEndAdornment
    ? {
      endAdornment: renderEndAdornment({ value }),
    }
    : undefined;

  return (
    <MUITextField
      {...props}
      inputProps={inputProps}
      error={!!error}
      InputLabelProps={{ shrink: !!value }}
      {...register(name)}
      InputProps={{ ...props.InputProps, ...InputProps }}
      helperText={error ? error.message : helperText}
    />
  );
};
