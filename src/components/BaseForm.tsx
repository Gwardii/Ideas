import { usePreventUnload } from 'hooks/usePreventUnload';
import { DefaultValues, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { Box, BoxProps, Skeleton } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormCard, FormCardTitle } from 'components/FormCard';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { TextField } from './TextField';
import { companyDevelopmentLevels, investmentLevels, operatingFieldsOfCompany, researchFields } from './consts';

export const FormContainer = (props: BoxProps) => (
  <Box display="grid" gridTemplateColumns="1fr 1fr" gap="24px" {...props} />
);

export const FormColumn = (props: BoxProps) => (
  <Box display="flex" flexDirection="column" gap="24px" {...props} />
);

export const ResearcherSeekForm = () => {

  return (
    <>
      <Select label="Who" name="who" options={[
        { value: 'Scientists for R&D projects' },
        { value: 'Scientists for R&D exchange' },
        { value: 'Entrepreneurs for R&D projects' },
        { value: 'Entrepreneurs to sell your technology' },
      ]} />
      <Select label="Output TRL of the project" name="outputTrlOfTheProject" options={[
        { value: "TRL 1 (Basic research)" },
        { value: "TRL 2 - TRL 6 (Industrial research)" },
        { value: "TRL 7 - TRL 9 (Experimental development)" },
      ]} />
      <MultiSelect label="Research field" name="researchField" options={researchFields} />
      <TextField name="abstractOfThePlannedResearch" label="Abstract of the planned research" />
    </>
  );
};

const InvestorSeekForm = () => {
  return <Select name="who" options={[
    { label: "Business to invest", value: "Business to invest" }
  ]} />
}

const EntrepreneurSeekForm = () => {
  const who = useWatch({ name: 'who' });
  const abstractLabel = who === 'Scientists for R&D projects' || who === 'Scientists for R&D exchange'
    ? 'Abstract of the planned research' : who === 'Scientists to buy theirs technology' ? 'Required technology'
      : 'Required investment';
  return <> <Select name="who" options={[
    { value: 'Scientists for R&D projects' },
    { value: 'Scientists for R&D exchange' },
    { value: 'Scientists to buy theirs technology' },
    { value: 'Investors' },
  ]} />
    <Select label="Output TRL of the project" name="outputTrlOfTheProject" options={[
      { value: "TRL 1 (Basic research)" },
      { value: "TRL 2 - TRL 6 (Industrial research)" },
      { value: "TRL 7 - TRL 9 (Experimental development)" },
    ]} />
    <MultiSelect label="Research field" name="researchField" options={researchFields} />
    {who === 'Investors' && <Select name="idealInvestment"
      label="Ideal investment level"
      options={investmentLevels.map(x => ({ value: x }))} />}
    <TextField name="abstractOfThePlannedResearch" label={abstractLabel} />
  </>
}

type FirstStepProps = {
  onSubmit: () => void;
};
const FirstStep = (props: FirstStepProps) => {
  const { formState } = useFormContext();
  const userType = useWatch({ name: 'userType' });

  return (
    <FormContainer>
      <FormColumn sx={{ transform: formState.isSubmitting ? 'translateX(0)' : 'translateX(100px)', transition: "transform 0.5s ease" }}>
        <FormCard gap="16px">
          <FormCardTitle>Who are you?</FormCardTitle>
          <Select name="userType" options={[
            { label: "Researcher", value: "researcher" },
            { label: "Entrepreneur", value: "entrepreneur" },
            { label: "Investor", value: "investor" },
          ]} />
          {userType === "entrepreneur" && <>
            <Select name="operatingFieldOfTheCompany"
              label="Operating field of the company"
              options={operatingFieldsOfCompany.map(x => ({ value: x }))} />
            <Select name="companyDevelopmentLevel"
              label="Company development level"
              options={companyDevelopmentLevels.map(x => ({ value: x }))} />
          </>}
        </FormCard>
        {userType !== undefined && <>
          <FormCard gap="16px">
            <FormCardTitle>What do you seek for?</FormCardTitle>
            {userType === 'researcher' && <ResearcherSeekForm />}
            {userType === 'entrepreneur' && <EntrepreneurSeekForm />}
            {userType === 'investor' && <InvestorSeekForm />}
          </FormCard>
          <Box alignSelf="end" display="flex" gap="20px" mt="auto">
            <LoadingButton
              type="button"
              variant="contained"
              endIcon={<BackupIcon />}
              onClick={props.onSubmit}
              loading={formState.isSubmitting}
            >
              Submit
            </LoadingButton>
          </Box>
        </>}
      </FormColumn>
      {formState.isSubmitting && <FormColumn>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </FormColumn>
      }
    </FormContainer>
  );
};

export const baseFormSchema = z.object({
  userType: z.string().optional(),
  who: z.string().optional(),
});

export type BaseFormValues = z.infer<typeof baseFormSchema>;

type BaseFormProps = {
  defaultValues: DefaultValues<BaseFormValues>;
  onSubmit: (values: BaseFormValues) => Promise<void>;
};
export const BaseForm = (
  props: BaseFormProps,
) => {
  const form = useForm({
    resolver: zodResolver(baseFormSchema),
    mode: 'onChange',
    defaultValues: props.defaultValues,
  });

  const { isDirty } = form.formState;
  usePreventUnload({ shouldPrevent: isDirty });

  const handleSubmit = async (values: BaseFormValues) => {
    try {
      await props.onSubmit(values);
    } finally {
      form.reset(form.getValues());
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={() =>
          form.handleSubmit(handleSubmit, (errors) =>
            console.log(errors, form.getValues()),
          )()}
      >
        <FirstStep
          onSubmit={() =>
            form.handleSubmit(handleSubmit, (errors) =>
              console.log(errors, form.getValues()),
            )()
          }
        />
      </form>
    </FormProvider>
  );
};
