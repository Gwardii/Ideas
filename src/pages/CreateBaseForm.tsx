import { useNavigate } from 'react-router-dom';
import { BaseForm, baseFormSchema, BaseFormValues } from 'components/BaseForm';
import { usePersistedFormValues } from 'hooks/usePersistedFormValues';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from 'api/request';

const create = async (payload: BaseFormValues) => {
  return request('prompt', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const useCreate = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['response'],
      });
    },
  });
};

export const CreateBaseForm = () => {
  const navigate = useNavigate();
  const create = useCreate();
  const persistedFormValues = usePersistedFormValues(baseFormSchema);

  const handleSubmit = async (values: BaseFormValues) => {
    await create.mutateAsync(values);
    navigate('/');
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      defaultValues={
        persistedFormValues ?? {}
      }
    />
  );
};
