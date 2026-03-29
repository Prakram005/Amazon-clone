const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-md bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e7e7e7] border-t-[#ff9900]"></div>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  )
}

export default Loader
