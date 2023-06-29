import LoadingButtonMUI, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import useLoading from '@/hooks/useLoading'

const LoadingButton = ({
  onClick,
  label = 'Save',
  icon = <SaveIcon />,
  disabled,
  color,
  ...rest
}: Partial<Pick<LoadingButtonProps, 'color' | 'variant'>> & {
  disabled?: boolean
  onClick?: () => void | Promise<void>
  label: string
  icon?: JSX.Element
}) => {
  const { loading, setLoading } = useLoading()

  return (
    <LoadingButtonMUI
      className={`${color === 'success' && 'bg-green-600'}`}
      disabled={disabled}
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
      {...rest}
    >
      {label}
    </LoadingButtonMUI>
  )
}

export default LoadingButton
