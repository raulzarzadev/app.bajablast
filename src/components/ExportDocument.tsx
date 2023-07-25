import { Button } from '@mui/material'
import { useCallback } from 'react'
import { utils, writeFile } from 'xlsx'

const ExportDocument = ({
  document = [],
  fileName = 'bajaBlastFile'
}: {
  document: any[]
  fileName: string
}) => {
  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(document)
    /* create workbook and append worksheet */
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    /* export to XLSX */
    writeFile(wb, `${fileName}.xlsx`)
  }, [document, fileName])

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault()
          exportFile()
        }}
      >
        Exportar
      </Button>
    </div>
  )
}

export default ExportDocument
