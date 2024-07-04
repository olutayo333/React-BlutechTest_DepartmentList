import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import logo from './assets/unlimilogo.png'; import alarm from './assets/alarm.png'
import { IoIosSearch } from "react-icons/io"; import { FaBell } from "react-icons/fa6";
import doctor from './assets/doctor 2.png'
import { jsPDF } from 'jspdf'; 
import { IoIosCloudDownload } from "react-icons/io";
import autoTable from 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
//import autoTable from 'jspdf-autotable';
//import loadingGif from "../assets/loadinggif1.gif";

function App() {
let URL1 = "http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX"
let URL2 = "http://3.88.1.181:8000/products/public/catalog?supplier=FragranceNet"

const [array, setarray]= useState([])
const [name, setname] = useState("Deko")
const[status, setstatus] = useState(true)
const [search, setsearch] = useState("")
const [filterResult, setfilterResult]= useState([])

useEffect(()=>{
  axios.get(URL2, {headers: {"Content-Type": "application/json", "Accept": "application/json" }})
  .then((response)=>{
    //console.log(response.data); .charAt(0).toUpplerCase()
    setarray([...response.data]);
    console.log(array);
    setstatus(true)
  })

}, [])

//PDF DOWNLOAD FUNCTION
const pdfdata = array.map((each, index)=>([index+1 , each.SKU, each.Designer, each.Title.toLowerCase(), each.Description.toLowerCase(), each.Brand.toLowerCase(), each['Cost Price'], each.Quantity]))
    const handleDownloadPdf = ()=> {
        const doc = new jsPDF();
         doc.text(" ", 10, 10);
         doc.autoTable({
            theme:'grid',
            startY:20,
            head:[['S/N', 'SKU', 'Name', 'Title', 'Description', 'Brand', 'Cost Price', 'Quantity']],
            body:pdfdata,
         });
        doc.save("DepartmentList.pdf");
      }  
    const filter = ()=>{
      let result = array.filter(u=>(u.Designer.toLowerCase().match(search.toLowerCase())))
      setfilterResult([...result]) //setsearchbydepartment([...result]);
      //console.log(result); 
      console.log(result.length);
      setstatus(false)
      //console.log(status);
      if (result.length == array.length){
        setstatus(true)
        //console.log(status);
      }
    }

  return (
    <>
      <div className='container' style={{backgroundColor:'#F6F6F6',}}>
        <div className='row p-lg-5' style={{height:"10%"}}>
          <div className='col-lg-3 ' style={{justifyContent:"start", alignContent:"left"}}>
            <img width="70%" src={logo} alt="" />
          </div>
          <div className='col-lg-3 d-flex'>
            <button className='bg-white' style={{border:'none', borderTopRightRadius:0, borderBottomRightRadius:0}}><IoIosSearch /></button>
            <input type="text" placeholder=" Search by name" className='form-control' onChange={(e) => setsearch(e.target.value)} onKeyUp={filter} style={{border:'none', borderTopLeftRadius:0, borderBottomLeftRadius:0}} />
          </div>
          <div className='col-lg-2'>

          </div>
          <div className='col-lg-3 d-flex ms-5 text-lg-left ' style={{justifyContent:"end", float:"right", textAlign:"right", height:"10%"}}>
            <img style={{borderRadius:"100%"}}  className='shadow mx-lg-1' src={alarm} alt="" />
            <img style={{borderRadius:"100%"}}  src={doctor} alt="" className='mx-lg-1' />
            <select className=" form-select mx-lg-1 w-lg-50 w-50 "id="" value={name} style={{zIndex:1}} onChange={(e) => setname(e.target.value)}>
              <option value="">Deko</option>
            </select>
          </div>
          
        </div>
        <div className='row' style={{backgroundColor:'#F6F6F6', borderRadius:"20px", marginLeft:"1vw"}}>
          <div className='col-lg-12 col-12 ' style={{  justifyContent:"space-between", overflow:"scroll", width:"100vw", height:"100vh", color:"#262626", fontSize:"11px", fontWeight:"400", lineHeight:"16px", fontFamily:"inter, sans-serif", padding:"1vh, 1vw, 1vh, 1vw"}}>
              <p style={{lineHeight:'2', textAlign:"left", fontSize:"30px", color:"black", marginLeft:"2%"}} >Department List 
                <span className='' style={{paddingLeft: '45vw', color:'#0341A7' }}>
                  <button className='btn mt-2 animate__animated animate__flash animate__delay-2s  animate__infinite infinite animate__slower' 
                      onClick={handleDownloadPdf}> <b style={{letterSpacing:"3px"}}><IoIosCloudDownload /> 
                      <span className='ms-1'>Download List</span></b> 
                  </button>
                </span>
              </p>
              {
                status ? 
                <>
                    <table className=' table table-sm rounded  table-hover' style={{backgroundColor:"#FFFFFF", marginRight:"10px", borderRadius:"30px", padding:"1vh, 1vw, 1vh, 1vw"}} >
                    <tbody style={{padding:"1vh, 1vw, 1vh, 1vw"}}>
                      {/* track student.id */}
                      <tr  style={{textAlign:'left', backgroundColor:'#F0F4FE', position:"sticky", top:"0" }} className='pt-5 mb-5'>
                        <th className='pt-3'><input type="checkbox" /></th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}} > S/N </th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}> Image </th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>SKU</th>
                        <th className='pt-3' style={{padding:"1vh 3vw 1vh 3vw ", backgroundColor:'#F0F4FE'}}>Name</th>
                        <th className='pt-3' style={{padding:"0 4vw 0 4vw ", backgroundColor:'#F0F4FE'}}>Title</th>
                        
                        <th className='pt-3' style={{padding:"0 4vw 0 4vw ", backgroundColor:'#F0F4FE'}}>Description</th>
                        <th className='pt-3' style={{padding:"0 1vw 0 1vw ", backgroundColor:'#F0F4FE'}}>Brand</th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>Cost Price</th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>Quantity</th>
                        <th className='pt-3'>Size</th>
                      </tr> <br /> <br />
                      {
                        array.map((each, index)=>(
                          <tr style={{textAlign:'left'}} className=' align-items-center mt-3' key={index}>
                            <td className='pt-3'><input type="checkbox" /></td> 
                            <td className='pt-3' >{index+1}.</td>
                            <td><img style={{borderRadius:"7px"}} width="30" height="35" src={each.Image_1} alt="" /></td>
                            <td className='pt-3'>{each.SKU}</td>
                            <td className='pt-3' style={{padding:"0 3vw 0 3vw "}}>{each.Designer}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 4vw 0 4vw "}}>{each.Title.toLowerCase()}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 4vw 0 4vw "}} >{each.Description.toLowerCase().substring(0,10)}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 1vw 0 1vw "}}>{each.Brand.toLowerCase()}</td>
                            <td className='pt-3' >{each['Cost Price']}</td>
                            <td className='pt-3'>{each.Quantity}</td>
                            <td className='pt-3'>{each.size}</td> 
                          </tr> 
                        )) 
                      } 
                    </tbody>
                  </table>
                </>:
                <>
                    <table className=' table table-sm rounded  table-hover' style={{backgroundColor:"#FFFFFF", marginRight:"10px", borderRadius:"30px", padding:"1vh, 1vw, 1vh, 1vw"}} >
                    <tbody style={{padding:"1vh, 1vw, 1vh, 1vw"}}>
                      {/* track student.id */}
                      <tr  style={{textAlign:'left', backgroundColor:'#F0F4FE', }} className='pt-5 mb-5'>
                        <th className='pt-3'><input type="checkbox" /></th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}} > S/N </th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}> Image </th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>SKU</th>
                        <th className='pt-3' style={{padding:"1vh 3vw 1vh 3vw ", backgroundColor:'#F0F4FE'}}>Name</th>
                        <th className='pt-3' style={{padding:"0 4vw 0 4vw ", backgroundColor:'#F0F4FE'}}>Title</th>
                        
                        <th className='pt-3' style={{padding:"0 4vw 0 4vw ", backgroundColor:'#F0F4FE'}}>Description</th>
                        <th className='pt-3' style={{padding:"0 1vw 0 1vw ", backgroundColor:'#F0F4FE'}}>Brand</th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>Cost Price</th>
                        <th className='pt-3' style={{paddingRight:"2vw", backgroundColor:'#F0F4FE'}}>Quantity</th>
                        <th className='pt-3'>Size</th>
                      </tr> <br /> <br />
                      {
                        filterResult.map((each, index)=>(
                          <tr style={{textAlign:'left'}} className=' align-items-center mt-3' key={index}>
                            <td className='pt-3'><input type="checkbox" /></td> 
                            <td className='pt-3' >{index+1}.</td>
                            <td><img style={{borderRadius:"7px"}} width="30" height="35" src={each.Image_1} alt="" /></td>
                            <td className='pt-3'>{each.SKU}</td>
                            <td className='pt-3' style={{padding:"0 3vw 0 3vw "}}>{each.Designer}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 4vw 0 4vw "}}>{each.Title.toLowerCase()}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 4vw 0 4vw "}} >{each.Description.toLowerCase().substring(0,10)}</td>
                            <td className='pt-3' style={{textTransform:"capitalize", padding:"0 1vw 0 1vw "}}>{each.Brand.toLowerCase()}</td>
                            <td className='pt-3' >{each['Cost Price']}</td>
                            <td className='pt-3'>{each.Quantity}</td>
                            <td className='pt-3'>{each.size}</td> 
                          </tr> 
                        )) 
                      } 
                    </tbody>
                  </table>
                </>
              }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
