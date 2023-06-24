import Link from 'next/link'
const LinkApp = ({
  href,
  label,
  selected
}: {
  href: string
  label: string
  selected?: boolean
}) => {
  return (
    <Link
      className={`uppercase underline active:underline hover:font-bold  text-blue-600 ${
        selected ? 'font-bold' : 'font-normal'
      }`}
      href={href}
    >
      {label}
    </Link>
  )
}

export default LinkApp
