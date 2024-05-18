const ReqModal=({isVisible,onClose})=>{
    if(!isVisible) return null
    return (
        <>
        <div className="z-40 fixed inset-0 flex  justify-center overflow-hidden  bg-black/60 overflow-y-scroll  items-center">
        <div className="border m-4 rounded-md   h-fit   w-1/2 bg-white">
        <div className="border border-2px rounded-md m-3">
<div className="flex justify-between">
  <div></div>
  <div className="mt-2 mr-3 cursor-pointer" onClick={onClose} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</div>
</div>
<div className="m-4 mt-0 mb-0">
<span className="font-semi-bold">Days Required</span>
</div>
  <div className="border border-2px m-3 mt-2 flex flex-wrap rounded-md h-10 items-center px-2 ">
    <p className="max-w-full ">
      4 day(s)
    </p>
  </div>
  <div className="m-3 mt-0 mb-0">
<span className="font-semi-bold">Extend Reason</span>
</div>
  <div className="border border-2px m-3 flex flex-wrap min-h-20 rounded-md">
    <p className="max-w-full break-words px-1">
dalldaldlaldladlaldjaljdjajdajjdajodjajodjaojdjajdjdjaodjaojdjajdajdjajdojajdojaojdoajdojaojdajdjajdoajdjoajodjoajdojoajojojojjojdojaodjoajdojaojdoajodjaojdojaojdoajodjaojjdojaodjojdadsaldadadadjpjapdjpajdjapjdjdapjdpapjdjdajjjodjjjjdjasjjjdjjdjojnjdnajdnaknsdkandnadnkandknakndkankdnnkankdnkndknakndkn
    </p>
  </div>
  
 
</div>
</div>
</div>
        
        </>
    )
}

export default ReqModal