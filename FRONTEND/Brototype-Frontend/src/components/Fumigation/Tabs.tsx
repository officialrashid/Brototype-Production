import { useLocation,withRouter } from "react-router-dom"


const Tabs=({tabs})=>{

    const location=useLocation()
    return(


        <>
<div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      {tabs.map((tab) => (
        <tab.component
          key={tab.label}
          to={tab.to}
          label={tab.label}
          activeOnlyWhenExact={tab.exact}
         
        />
      ))}
    </div>
        
        </>
    )
}

export default Tabs