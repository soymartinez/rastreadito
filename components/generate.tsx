import { QRCode } from 'react-qrcode-logo'

function Qr({
    value,
    size,
    logoImage,
    logoWidth,
    logoHeight,
    logoOpacity,
}: {
    value: string
    size: number
    logoImage?: string
    logoWidth?: number
    logoHeight?: number
    logoOpacity?: number
}) {
    return (
        <QRCode
            value={value}
            size={size}
            logoImage={logoImage}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            logoOpacity={logoOpacity}
        />
    )
}

export {
    Qr,
}