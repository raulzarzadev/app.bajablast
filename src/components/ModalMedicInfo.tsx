import useModal from '@/hooks/useModal'
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import Modal from './Modal'
import ControllerAutocomplete from './ControllerAutocomplete'
import ControllerCheckbox from './ControllerCheckbox'
import ControllerText from './ControllerText'
import { useFormContext } from 'react-hook-form'
import bloodTypes from '@/CONST/bloodTypes'
import { useEffect } from 'react'
import AppIcon from './AppIcon'
import useParkConfig from '@/hooks/useParkConfig'

const ModalMedicInfo = ({ name = '', justIcon = false }) => {
  const medicModal = useModal()
  const methods = useFormContext()

  const medicalInfoUpdated = methods.watch(`${name}medicalInfoUpdated`)
  const conditionsAdded = methods.watch(`${name}medicalInfo`)
  const handleAddCondition = (condition: string) => {
    const addedCondition = `${conditionsAdded} ${condition},`
    methods.setValue(`${name}medicalInfo`, addedCondition)
  }
  const { parkConfig } = useParkConfig()
  const medicalConditions = [...(parkConfig?.checkMedicalConditions || [])]
  return (
    <>
      <Box className="flex w-full justify-center">
        <Tooltip title="Información medica">
          {justIcon ? (
            <IconButton
              onClick={(e) => {
                e.preventDefault()
                medicModal.handleOpen()
              }}
              color={medicalInfoUpdated ? 'success' : 'error'}
            >
              <AppIcon icon="medicalInfo" />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={(e) => {
                e.preventDefault()
                medicModal.handleOpen()
              }}
              color={medicalInfoUpdated ? 'success' : 'error'}
              endIcon={<AppIcon icon="medicalInfo" />}
            >
              Actualizar info
            </Button>
          )}
        </Tooltip>
      </Box>

      <Modal {...medicModal} title="Información Medica">
        <div className="flex flex-col gap-4">
          <Typography component={'p'} variant="body2">
            * Rellena cuidadosamente esta información.{' '}
          </Typography>
          <ControllerAutocomplete
            options={bloodTypes}
            name={`${name}bloodType`}
            label="Tipo de sangre"
          />

          <Stack
            direction="row"
            spacing={1}
            flexWrap={'wrap'}
            useFlexGap={true}
          >
            {medicalConditions.map((condition) => (
              <Chip
                disabled={conditionsAdded
                  .toLowerCase()
                  .includes(condition.toLowerCase())}
                key={condition}
                label={condition}
                onClick={() => handleAddCondition(condition)}
              />
            ))}
          </Stack>

          <ControllerText
            name={`${name}medicalInfo`}
            label="Alergias, enfermedades, padecimientos "
            multiline
            minRows={4}
            maxRows={8}
            fullWidth
          />

          <ControllerText
            name={`${name}weight`}
            label="Peso (kg)"
            type="number"
            fullWidth
          />

          <ControllerCheckbox
            name={`${name}medicalInfoUpdated`}
            label="Esta información esta actualizada"
          />

          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              medicModal.onClose()
            }}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ModalMedicInfo
