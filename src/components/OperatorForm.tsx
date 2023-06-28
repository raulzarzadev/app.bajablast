import { ActivityOperator, ParkActivity } from '@/types/activities'
import { FormProvider, useForm } from 'react-hook-form'
import ControllerText from './ControllerText'
import ScheduleForm from './ScheduleForm'

const OperatorForm = ({
  operator,
  onSubmit
}: {
  operator?: ActivityOperator
  onSubmit?: (operator: ActivityOperator) => void
}) => {
  const methods = useForm({ defaultValues: operator })
  return (
    <div>
      <form>
        <FormProvider {...methods}>
          <ControllerText name="name" />
          <ScheduleForm
            schedule={operator?.schedule}
            onSubmit={(schedule) => {
              console.log({ schedule })
            }}
          />
        </FormProvider>
      </form>
    </div>
  )
}

export default OperatorForm
