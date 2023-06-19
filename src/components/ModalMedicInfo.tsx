import useModal from '@/hooks/useModal'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import Modal from './Modal'
import ControllerAutocomplete from './ControllerAutocomplete'
import ControllerCheckbox from './ControllerCheckbox'
import ControllerText from './ControllerText'
import { useFormContext } from 'react-hook-form'
import bloodTypes from '@/CONST/bloodTypes'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import { useEffect } from 'react'
const ModalMedicInfo = ({ name = '', justIcon = false }) => {
  const medicModal = useModal()
  const methods = useFormContext()

  const medicalInfoUpdated = methods.watch(`${name}medicalInfoUpdated`)

  const { dirtyFields } = methods.formState
  useEffect(() => {
    if (dirtyFields?.medicalInfo) {
      methods.setValue(`${name}medicalInfoUpdated`, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields])
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
              <MedicalInformationIcon />
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
              endIcon={<MedicalInformationIcon />}
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

          <ControllerText
            name={`${name}medicalInfo`}
            label="Alergias, enfermedades, padecimientos "
            multiline
            minRows={4}
            maxRows={8}
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
