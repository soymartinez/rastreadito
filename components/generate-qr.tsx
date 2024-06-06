'use client'

import { QRCode, IProps } from 'react-qrcode-logo'

export default function GenerateQr(props: IProps) {
  return (
    <QRCode
      size={200}
      quietZone={20}
      bgColor={'#00e99e'}
      fgColor={'#1b1b1b'}
      qrStyle={'squares'}
      ecLevel={'L'}
      {...props}
    />
  )
}