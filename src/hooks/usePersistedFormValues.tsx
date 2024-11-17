import { useLocation } from 'react-router-dom';
import { z } from 'zod';

export const usePersistedFormValues = <Schema extends z.ZodType>(validationSchema: Schema) => {
  const { state } = useLocation();
  const parsedState = z.object({ formValues: validationSchema }).safeParse(state);
  return parsedState.success ? parsedState.data.formValues : null;
};
