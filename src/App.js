
// import Home from './components/Pages/Home';
// import InstituteRegistration from './components/Pages/Registration';
// import StudentRegistration from './components/Pages/StudentRegistration';
// import Courseform from './components/Pages/Courseform';
// import AuthLayout from './components/Layouts/AuthLayout';


// function App() {
//   return (
//    <>
//    <Home/>
//    <InstituteRegistration/> 
//    <StudentRegistration/> 
//   <Courseform/> 
//     <AuthLayout/>
//    </>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthLayout from './components/Layouts/AuthLayout';
import InstituteRegistration from './components/Pages/Registration';
 import StudentRegistration from './components/Pages/StudentRegistration';
import InstituteDashboard from './components/Pages/InstituteDashboard';
function LandingPage(props) {

  const width = props.width
  const height = props.height

  const handleSpinner = () => {
    Swal.fire({
      title: '',
      background: "#80808000",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },

    })
  }

      return (
        <Routes>

          <Route path={"/"} element= {<InstituteDashboard {...props} /> }/>
          <Route path={"/instituteregistration"}  element={ <InstituteRegistration {...props} />} />

          <Route path={"/studentregistration"} element={ <StudentRegistration  {...props} listProp="RTI" />} />
          </Routes>
      )
   
}

function App() {

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {

    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };



  return (
    <Router>
  
        <LandingPage width={width} height={height} />

      
    </Router>

  );
}

export default App;
// https://www.careerpower.in/

// <!-- class -> when css is used by multiple tags
// id -> when need css in single tag # -->

// components -foloder  UI
      //  Layouts -file
      //   Pages - Home.js
      //   Reports
      //   
// container - files  - Data calling
//  Home.js
    
// constant - files
  //  colors
  //  
  //   data 

// styles -->files
   //home.cssroutes