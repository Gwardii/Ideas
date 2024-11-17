import { Autocomplete, AutocompleteProps, Checkbox, Chip, TextField } from '@mui/material';
import { FieldPath, FieldValues, PathValue, useController } from 'react-hook-form';

type MultiSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  options: string[];
  name: TName;
  defaultValue?: PathValue<TFieldValues, TName>;
  label: string;
  disabled?: boolean;
  loading?: boolean;
} & Omit<
  AutocompleteProps<string, true, undefined, undefined>,
  'renderInput' | 'renderOption' | 'renderTags' | 'onChange' | 'value' | 'options'
>;

export const MultiSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  defaultValue,
  disabled,
  ...props
}: MultiSelectProps<TFieldValues, TName>) => {
  const {
    field: { ref, ...field },
  } = useController<TFieldValues, TName>({
    name: props.name,
    defaultValue: defaultValue ?? ([] as PathValue<TFieldValues, TName>),
  });

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      {...props}
      {...field}
      disabled={disabled}
      onChange={(_, values) => {
        field.onChange(values);
      }}
      value={field.value}
      options={options}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option}>
          <Checkbox checked={selected} />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField inputRef={ref} {...params} label={props.label} />}
      renderTags={(values, getTagProps) =>
        values.map((option, index) => {
          const tagProps = getTagProps({ index });
          return <Chip label={option} size="small" {...tagProps} key={tagProps.key} />;
        })
      }
    />
  );
};
