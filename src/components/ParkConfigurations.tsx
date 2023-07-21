'use client'
import { Box, Button, IconButton, Typography } from '@mui/material'
import CurrencySpan from './CurrencySpan'
import WeekSchedule from './WeekSchedule'
import { useEffect, useState } from 'react'
import {
  deleteParkConfiguration,
  listenParkConfigurations,
  updateParkConfiguration
} from '@/firebase/parkConfigurations'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ParkConfigurationForm from './ParkConfigurationForm'
import { ParkConfiguration } from '@/types/parkConfiguration'
import useParkConfig from '@/hooks/useParkConfig'
import ModalConfirm from './ModalConfirm'

const ParkConfigurations = () => {
  return (
    <div>
      <ParkConfigurationsList />
    </div>
  )
}

const ParkConfigurationsList = () => {
  const [configurations, setConfigurations] = useState<ParkConfiguration[]>([])
  useEffect(() => {
    listenParkConfigurations(setConfigurations)
  }, [])
  const modalNew = useModal()

  const handleSelectConfig = async (configId: string) => {
    try {
      //* Update selected property as false for the others configs
      configurations.forEach(
        async (config) =>
          config.selected &&
          config.id !== configId &&
          (await updateParkConfiguration(config.id, { selected: false }))
      )
      //* Update select property as true for the config past
      await updateParkConfiguration(configId, { selected: true })
      return
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Box>
      <Typography variant="h5">Otras Configuraciones</Typography>
      {configurations.map((config) => (
        <ConfigurationCard
          key={config.id}
          config={config}
          handleSelectConfig={handleSelectConfig}
        />
      ))}
      <Box className="mx-auto flex w-full justify-center my-8">
        <Button
          onClick={(e) => {
            modalNew.handleOpen()
          }}
          variant="outlined"
        >
          Nueva configuración
        </Button>
      </Box>
      <Modal {...modalNew} title="Nueva configuración">
        <ParkConfigurationForm />
      </Modal>
    </Box>
  )
}
const ConfigurationCard = ({
  config,
  handleSelectConfig
}: {
  config: ParkConfiguration
  handleSelectConfig: (configId: string) => void
}) => {
  const modalEdit = useModal()
  const handleDelete = async () => {
    await deleteParkConfiguration(config.id).catch((err) => console.error(err))
  }
  const modalDelete = useModal()
  const modalChangeConfig = useModal()

  return (
    <Box
      key={config?.id}
      onClick={() => {
        modalChangeConfig.handleOpen()
        // handleSelectConfig(config.id)
      }}
      className={`my-2 border shadow-md p-2 rounded-md hover:bg-blue-300 cursor-pointer hover:shadow-none hover:border-transparent active:bg-transparent ${
        config.selected && 'bg-blue-500'
      }`}
    >
      <ModalConfirm
        title="Cambiar configuración"
        {...modalChangeConfig}
        buttonConfirmProps={{
          label: 'Cambiar configuración',
          onClick: () => handleSelectConfig(config.id)
        }}
      >
        <Typography>
          Cambiar la configuración puede alterar las estadisiticas . Asegurase
          de que esta en la configuración correcta antes de realziar cualquier
          otro movimiento dentro de la app
        </Typography>
      </ModalConfirm>
      <Box className="flex justify-between ">
        <Typography>{config?.name} </Typography>
        <Typography>
          Precio del dolar <CurrencySpan quantity={config?.dollarPrice} />
        </Typography>
        <IconButton
          onClick={() => {
            modalEdit.handleOpen()
          }}
        >
          <AppIcon icon="edit" />
        </IconButton>
        <Modal {...modalEdit} title="Editar configuración">
          <ParkConfigurationForm config={config} />
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={(e) => {
              modalDelete.handleOpen()
            }}
          >
            Eliminar
          </Button>
        </Modal>
        <ModalConfirm
          {...modalDelete}
          buttonConfirmProps={{
            onClick: handleDelete,
            color: 'error',
            label: 'Eliminar'
          }}
        >
          <Typography variant="h5" className="text-center my-10">
            Eliminar configuración
          </Typography>
        </ModalConfirm>
      </Box>
      <WeekSchedule schedule={config.schedule} />
    </Box>
  )
}

export default ParkConfigurations
