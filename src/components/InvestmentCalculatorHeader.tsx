import logo from '../assets/images/logo.jpg'

interface InvestmentCalculatorHeaderProps {
  title?: string
  subtitle?: string
}

export default function InvestmentCalculatorHeader({
  title,
  subtitle,
}: InvestmentCalculatorHeaderProps) {
  return (
    <header id="header" className="bg-amber-300 shadow-xs shadow-neutral-800">
      <div className="flex flex-row items-center">
        <div>
          <img className="h-20 w-20" src={logo} alt="logo" />
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-xl">{title ? title : 'title'}</h1>
          <h2 className="text-base">{subtitle ? subtitle : ''}</h2>
        </div>
        <div className="w-20"></div>
      </div>
    </header>
  )
}
