
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
import MyCourses from './components/Pages/MyCourses';
import Home from './components/Pages/Home';
import CourseTable from './components/Pages/BranchInformation';
import Faculty from './components/Pages/Faculty';
import CourseDetails from './components/Pages/CourseDetails';
import {HOME,
  COURSE_DETAILS, COURSE_TABLE, INSTITUTE_DETAILS,TUTOR_DASHBOARD,STUDENT_PROFILE,REPORT_OUTSIDE_STATUS,
  FACULTY_DETAILS, INSTITUTE_DASHBOARD, STUDENT_REGISTRATION,MYCOURSES,COURSE_PURCHASE,
  INSTITUTE_DETAILS_ID, INSTITUTE_PROFILE,STUDENTDASHBOARD,LIST_TUTOR,
  CHANGE_PASSWORD} from './constants/Routes';
import InstituteDetails from "./components/Pages/InstituteDetails"
import InstituteProfile from './components/Pages/InstituteProfile';
import StudentDashboard from './components/Pages/StudentDashboard';
import TutorDashboard from './components/Pages/TutorDashboard';
import Teacherdetails from './components/Pages/Teacherdetail';
import ListOfTutor from './components/Pages/ListOfTutor';
import InstituteListForStudent from "./components/Pages/InstituteListForStudent"
import StudentProfile from "./components/Pages/StudentProfile"
import ChangePassword from './components/Pages/ChangePassword';
import ReportOutSide from "./components/Pages/Reports/ReportOutside"
// import BranchInfo from "./BranchInformation";


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

  console.log(sessionStorage.getItem("roleId") === "2",sessionStorage.getItem("active") === "true")
 if (sessionStorage.getItem("active") === "true") {
    if (sessionStorage.getItem("roleId") === "1") {
      return (
        <Routes>
          <Route path={HOME} element= {<Home {...props} handleSpinner={handleSpinner} /> }/>

          {/* <Route path={"/TD"} element= {<Teacherdetail {...props} /> }/> */}


          <Route path={COURSE_DETAILS} element= {<CourseDetails {...props}  handleSpinner={handleSpinner}/> }/>
          <Route path={COURSE_TABLE} element= {<CourseTable {...props} handleSpinner={handleSpinner} /> }/> 
          <Route path={FACULTY_DETAILS} element= {<Faculty {...props} handleSpinner={handleSpinner} /> }/>

          <Route path={INSTITUTE_DETAILS_ID} element= {<InstituteDetails {...props} handleSpinner={handleSpinner} /> }/>

          <Route path={INSTITUTE_DASHBOARD} element= {<InstituteDashboard {...props} handleSpinner={handleSpinner} /> }/>

          {/* <Route path={"/instituteregistration"}  element={ <InstituteRegistration {...props} />} /> */}

          <Route path={STUDENT_REGISTRATION} element={ <StudentRegistration  {...props}  handleSpinner={handleSpinner}/>} />
          <Route path={MYCOURSES}  element={ <MyCourses {...props} handleSpinner={handleSpinner} />} />
          <Route path={INSTITUTE_PROFILE}  element={ <InstituteProfile {...props} handleSpinner={handleSpinner}/>} />
          <Route path={CHANGE_PASSWORD} element= {<ChangePassword {...props} handleSpinner={handleSpinner} /> }/>
          
          </Routes>
      )
    }
    else if (sessionStorage.getItem("roleId") === "2") {
      return (
        <Routes>
          <Route path={STUDENTDASHBOARD} element= {<StudentDashboard {...props} handleSpinner={handleSpinner}/> }/>
          <Route path={INSTITUTE_DETAILS_ID} element= {<InstituteDetails {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={STUDENT_PROFILE} element= {<StudentProfile {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={COURSE_PURCHASE} element= {<InstituteListForStudent {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={CHANGE_PASSWORD} element= {<ChangePassword {...props} handleSpinner={handleSpinner} /> }/>

          </Routes>
          )
    }
    else if (sessionStorage.getItem("roleId") === "3") {
      return (
        <Routes>
          <Route path={TUTOR_DASHBOARD} element= {<TutorDashboard {...props} handleSpinner={handleSpinner}/> }/>

           <Route path={FACULTY_DETAILS} element= {<Teacherdetails {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={INSTITUTE_DETAILS_ID} element= {<InstituteDetails {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={CHANGE_PASSWORD} element= {<ChangePassword {...props} handleSpinner={handleSpinner} /> }/>
       
          </Routes>
          )
    }
  }
  else if (sessionStorage.getItem("active") !== "true") {
    return (
      <Routes>
          <Route path={HOME} element= {<Home {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={COURSE_TABLE} element= {<CourseTable {...props}  handleSpinner={handleSpinner}/> }/> 
          <Route path={INSTITUTE_DETAILS_ID} element= {<InstituteDetails {...props} handleSpinner={handleSpinner} /> }/>
          <Route path={COURSE_DETAILS} element= {<CourseDetails {...props} handleSpinner={handleSpinner}/> }/>
          <Route path={LIST_TUTOR} element={<ListOfTutor {...props} handleSpinner={handleSpinner} />} />
          <Route path={REPORT_OUTSIDE_STATUS} element={<ReportOutSide {...props} handleSpinner={handleSpinner} />} />

        </Routes>
    )
  }
   
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
   
  
        <LandingPage width={width} height={height} />

      
  

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