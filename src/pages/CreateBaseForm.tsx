import { BaseForm, baseFormSchema, BaseFormValues } from 'components/BaseForm';
import { usePersistedFormValues } from 'hooks/usePersistedFormValues';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from 'api/request';
import { z } from 'zod';

const persona = z.object({ name: z.string(), directLink: z.string() });
const personas = z.object({ linkedin: z.array(persona), orcid: z.array(persona), researchgate: z.array(persona) });

export type PersonasType = z.infer<typeof personas>;

const create = async (payload: BaseFormValues) => {
  const prompt = `I'm ${payload.userType}. I'm looking for ${payload.who}. In research fields: ${payload.researchField.join(', ')}. For a project/investement described in abstract:${payload.abstract}
Please generate 5 Google search keywords (without additional explanation) from which 3 describes the field of the intended research field/investment (based on the Additional Information), separated by OR conjunction and 2 describes the role which I am searching for (based on the Introduction part, separated by OR conjunction. Connect this two parts by an AND conjunction.
Each keyword must consist of at most two words and should be unique from each other. Ensure that the keywords are relevant to the content of the text. Do not repeat keywords or combine similar concepts
Example of your answear structure:
(Neurosurgery OR robotic arm OR automation) AND (head of lab OR researcher)`
  return request('chatgpt', {
    method: 'POST',
    body: JSON.stringify({ prompt: prompt }),
    responseSchema: personas,
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
  const create = useCreate();
  const persistedFormValues = usePersistedFormValues(baseFormSchema);

  const handleSubmit = async (values: BaseFormValues) => {
    return await create.mutateAsync(values);
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
