import Image from 'next/image'

export default function CategoryCard({
    name,
    icon,
}: {
    name: string,
    icon: 'dropper' | 'bottle' | 'mortar' | 'cart' | 'blood-drop',
}) {
    return (
        <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
            <h1 className='text-xl font-semibold text-_white'>{name}</h1>
            <Image src={`/categories/${icon}.png`} alt={icon} width={44} height={44} />
        </div>
    )
}