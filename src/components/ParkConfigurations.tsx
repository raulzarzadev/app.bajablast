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
  return (
    <>
      <Box
        key={config?.id}
        className={`my-2 border shadow-md p-2 rounded-md  
      ${config.selected ? 'bg-blue-500' : ' '}`}
      >
        <Box className="flex justify-between ">
          <Typography>{config?.name} </Typography>
          <Typography>
            Precio del dolar <CurrencySpan quantity={config?.dollarPrice} />
          </Typography>
          <Box className="flex">
            <ModalEdit parkConfig={config} />
            <ModalSelect
              selected={config.selected}
              onSelect={() => handleSelectConfig(config.id)}
            />
          </Box>
        </Box>
        <WeekSchedule schedule={config.schedule} />
      </Box>
    </>
  )
}

const ModalSelect = ({
  onSelect,
  selected
}: {
  onSelect: () => void
  selected?: boolean
}) => {
  const modal = useModal()

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modal.handleOpen()
        }}
        variant="outlined"
        className={`${selected && 'text-white'}`}
      >
        {selected ? 'Seleccionado' : 'Seleccionar'}
      </Button>
      <ModalConfirm
        title="Cambiar configuración"
        {...modal}
        buttonConfirmProps={{
          label: 'Cambiar configuración',
          onClick: () => onSelect()
        }}
      >
        <Typography>
          Cambiar la configuración puede alterar las estadisiticas . Asegurase
          de que esta en la configuración correcta antes de realziar cualquier
          otro movimiento dentro de la app
        </Typography>
      </ModalConfirm>
    </>
  )
}

const ModalEdit = ({ parkConfig }: { parkConfig?: ParkConfiguration }) => {
  const modal = useModal()
  return (
    <>
      <IconButton
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.handleOpen()
        }}
      >
        <AppIcon icon="edit" />
      </IconButton>
      <Modal {...modal} title="Editar configuración">
        <ParkConfigurationForm config={parkConfig} />
        <ModalDelete configId={parkConfig?.id || ''} />
      </Modal>
    </>
  )
}

const ModalDelete = ({ configId }: { configId: ParkConfiguration['id'] }) => {
  const modal = useModal()
  const handleDelete = async () => {
    await deleteParkConfiguration(configId).catch((err) => console.error(err))
  }

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.handleOpen()
        }}
      >
        Eliminar
      </Button>
      <ModalConfirm
        {...modal}
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
    </>
  )
}

export default ParkConfigurations
