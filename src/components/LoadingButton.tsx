import LoadingButtonMUI, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import useLoading from '@/hooks/useLoading'
import AppIcon, { IconName } from './AppIcon'

const LoadingButton = ({
  onClick,
  label = 'Save',
  icon = 'save',
  disabled,
  color,
  ...rest
}: Partial<Pick<LoadingButtonProps, 'color' | 'variant'>> & {
  disabled?: boolean
  onClick?: () => void | Promise<void>
  label: string
  icon?: IconName
}) => {
  const { loading, setLoading } = useLoading()

  return (
    <LoadingButtonMUI
      variant="outlined"
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
      startIcon={icon ? <AppIcon icon={icon} /> : undefined}
      {...rest}
    >
      {label}
    </LoadingButtonMUI>
  )
}

export default LoadingButton
