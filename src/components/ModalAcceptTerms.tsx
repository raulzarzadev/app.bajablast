import useModal from '@/hooks/useModal'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material'
import Modal from './Modal'
import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import Image from 'next/image'

const ModalAcceptTerms = ({
  setSignature
}: {
  setSignature?: (signature: string | null) => void
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [_signature, _setSignature] = useState<string | null>(null)
  const termsAndCondsModal = useModal()
  const signatureRef = useRef<any>()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  const handleSetSignature = (signature: string | null) => {
    setTermsAccepted(!!signature)
    _setSignature(signature)
    setSignature?.(signature)
  }

  return (
    <div className="w-full">
      {termsAccepted ? (
        <Button
          fullWidth
          variant="outlined"
          color="success"
          onClick={(e) => {
            e.preventDefault()
            termsAndCondsModal.handleOpen()
          }}
        >
          Terminos aceptados
        </Button>
      ) : (
        <Button
          fullWidth
          onClick={(e) => {
            e.preventDefault()
            termsAndCondsModal.handleOpen()
          }}
          variant="outlined"
          color="error"
        >
          Aceptar terminos
        </Button>
      )}
      <Modal {...termsAndCondsModal} title="Terminos y condiciones">
        <Box className="flex flex-col gap-4">
          <Typography component={'p'} variant="body2">
            Lee cuidadosamente los terminos y condiciones, si estas de acuerdo
            firma y acepta abajo
          </Typography>
          <Typography
            component={'p'}
            variant="body2"
            className="whitespace-pre-line"
          >
            {`
              1.- Al acceder al parque acepto los riesgos inneretes que conlleva
              el realizar las actividades 
              2.- Acepto hacer caso a todos los
              instructores
              etc...
              `}
          </Typography>
          <Box className="flex w-full justify-between -mb-4">
            <Typography className="">Firma:</Typography>
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault()
                handleClearSignature()
                handleSetSignature(null)
                methods.setValue('termsAccepted', false)
              }}
              color="success"
            >
              Limpiar
            </Button>
          </Box>
          <Box className="border shadow-inner p-1">
            <SignatureCanvas
              onEnd={(e) => {
                const image = signatureRef.current
                  .getTrimmedCanvas()
                  .toDataURL('image/png')

                handleSetSignature(image)
                methods.setValue('termsAccepted', true)
              }}
              penColor="green"
              ref={(ref) => (signatureRef.current = ref)}
              canvasProps={{
                width: 500,
                height: 200,
                className: 'sigCanvas'
              }}
            />
          </Box>
          {_signature && (
            <Image
              src={_signature}
              width={80}
              height={80}
              alt="signature"
              className="w-[80px] h-[80px]"
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={!!termsAccepted}
                {...methods.register('termsAccepted')}
                disabled={!_signature}
              />
            }
            label={'Acepto los terminos y condiciones descritos arriba'}
          />

          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              termsAndCondsModal.onClose()
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAcceptTerms
