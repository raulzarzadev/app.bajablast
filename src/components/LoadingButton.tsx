import LoadingButtonMUI from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import useLoading from '@/hooks/useLoading'

const LoadingButton = ({
  onClick,
  label = 'Save',
  icon = <SaveIcon />
}: {
  onClick?: () => void | Promise<void>
  label: string
  icon?: JSX.Element
}) => {
  const { loading, setLoading } = useLoading()

  return (
    <LoadingButtonMUI
      onClick={async () => {
        try {
          setLoading(true)
          await onClick?.()
          setLoading(false)
        } catch (error) {
          console.error('error sent register ')
          setLoading(false)
        }
      }}
      loading={loading}
      loadingPosition="start"
      startIcon={icon}
    >
      {label}
    </LoadingButtonMUI>
  )
}

export default LoadingButton
