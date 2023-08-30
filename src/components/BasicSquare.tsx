import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

const BasicSquare = ({
  title,
  content,
  helperText
}: {
  title?: string
  content?: ReactNode
  helperText?: string
}) => {
  return (
    <Box
      component={'div'}
      className={`p-0 mx-auto 
        bg-pink-400 
        rounded-md 
        shadow-md
        w-full 
        sm:w-[190px]
        sm:aspect-video
        h-full
      `}
    >
      <Box
        component={'article'}
        className="flex flex-col gap-2 items-center justify-around  px-1 text-center  text-white w-full h-full py-1  "
      >
        {title && (
          <Typography component={'header'} variant="body1">
            {title}
          </Typography>
        )}

        {content && <Box component={'section'}>{content}</Box>}
        {helperText && (
          <Typography component={'footer'} variant="body1">
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default BasicSquare
