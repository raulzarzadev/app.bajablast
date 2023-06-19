import * as React from 'react'
import Box from '@mui/material/Box'
import MUIStepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepLabel } from '@mui/material'

export default function Stepper({
  steps,
  disableNext = true
}: {
  steps: { label: string; component: React.ReactNode }[]
  disableNext?: boolean
}) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean
  }>({})

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  // const handleComplete = () => {
  //   const newCompleted = completed
  //   newCompleted[activeStep] = true
  //   setCompleted(newCompleted)
  //   handleNext()
  // }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Box sx={{ width: '100%' }} className="max-w-md mx-auto">
      <MUIStepper activeStep={activeStep} alternativeLabel className="mb-4">
        {steps.map((label) => (
          <Step key={label.label}>
            <StepLabel>{label.label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>

      {steps[activeStep]?.component}

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atras
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Siguiente
              </Button>
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: 'inline-block' }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))} */}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  )
}
