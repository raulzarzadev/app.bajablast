import EditIconMUI from '@mui/icons-material/Edit'
import {
  SvgIconClasses,
  SvgIconPropsColorOverrides,
  SvgIconPropsSizeOverrides,
  SxProps,
  Theme
} from '@mui/material'
import {
  CommonProps,
  OverridableComponent
} from '@mui/material/OverridableComponent'
import { OverridableStringUnion } from '@mui/types'
import { JSX, ReactNode } from 'react'

const IconEdit = (
  props: JSX.IntrinsicAttributes & {
    children?: ReactNode
    classes?: Partial<SvgIconClasses> | undefined
    color?:
      | OverridableStringUnion<
          | 'disabled'
          | 'action'
          | 'inherit'
          | 'primary'
          | 'secondary'
          | 'error'
          | 'info'
          | 'success'
          | 'warning',
          SvgIconPropsColorOverrides
        >
      | undefined
    fontSize?:
      | OverridableStringUnion<
          'small' | 'inherit' | 'large' | 'medium',
          SvgIconPropsSizeOverrides
        >
      | undefined
    htmlColor?: string | undefined
    inheritViewBox?: boolean | undefined
    shapeRendering?: string | undefined
    sx?: SxProps<Theme> | undefined
    titleAccess?: string | undefined
    viewBox?: string | undefined
  } & CommonProps &
    Omit<
      any,
      | keyof CommonProps
      | 'children'
      | 'color'
      | 'fontSize'
      | 'htmlColor'
      | 'inheritViewBox'
      | 'shapeRendering'
      | 'sx'
      | 'titleAccess'
      | 'viewBox'
    >
) => {
  return <EditIconMUI {...props} />
}

export default IconEdit
