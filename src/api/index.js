import express from "express";
import { connection } from "./database.js";
import cors from 'cors';
import multer from "multer";
import fs from "fs-extra"; 
import path from "path";
const app = express ();
app.use(express.json());
app.use(cors())
app.use(express.static('uploads')); // Serve uploaded files statically
const PORT = 3004;

// const upload = multer({ dest: 'uploads/' }); 

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    else{
      console.log('Connected to the MySQL database.');
    }
});
});

// ************************************************** File Upload Configuration *

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename:  (req, file, cb)=> {cb(null, file.fieldname + "_"+ Date.now()+path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

app.use('/uploads/:id',upload.single('image'),(req,res)=>{
  const image = req.file.filename;
  const sql = 'UPDATE user SET profile_image = ? WHERE id = ?';
  connection.query(sql, [image, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating image in database.');
    }
    res.send('Image uploaded and database updated successfully.');
  });

}) // Serve uploaded files statically

app.get('/getimage', (req, response) => {

  let sql = "SELECT * from user";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});
// ****************************************** API Endpoints *************************


app.use('/uploadsaddinstitute/:status',upload.single('image'),(req,res)=>{
  const image = req.file.filename;
  const sql = 'INSERT INTO user ( profile_image, status_type) VALUES (?,?)' 
  connection.query(sql, [image, req.params.status], (err, result) => {
    if (err) {
      return res.status(500).send('Error insert image in database.');
    }
    res.send('Image uploaded and database updated successfully.');
  });

})

// app.post("/saveCourseData", (request, response) => {
//   const {courseid, 
//     course_name, 
//     course_duraton, 
//     course_fee, 
//     status, 
//     mode, timing, 
//     course_medium, 
//     start_date, 
//     end_date, 
//     discount,
//     max_student, 
//     course_details,
//     creation_date} = request.body;
//   let sql = "INSERT INTO course_details ( course_name, course_duraton, course_fee, status, mode, timing, course_medium, start_date, end_date, discount,max_student,course_details, creation_date) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?)";   
//   connection.query(sql, [
//     course_name, 
//     course_duraton, 
//     course_fee, 
//     status, 
//     mode, timing, 
//     course_medium, 
//     start_date, 
//     end_date, 
//     discount,
//      max_student, 
//     course_details, 
//     creation_date], (error, results) => {
//     if (error) {
//       return response.status(500).send("Error saving course_details to database.");
//     } 
//     response.status(201).send(`Note added with ID: ${results.insertId}`);
//   });
// });



// ******************************************************

app.get("/getCourseDetails", (request, response) => {
  let sql = "SELECT * from course_details";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});

app.get("/getCourseData/:id", (request, response) => {
   const institute_id = request.params.id;
           
  let sql = "SELECT * FROM course_details WHERE institute_id = ? ";
  connection.query(sql, [institute_id], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
});
});


app.get("/getPurchaseCourseData/:email/:course_id", (request, response) => {
   const course_id = request.params.course_id;
   const email = request.params.email;

           
  let sql = "SELECT * FROM purchase_course WHERE course_id = ? AND email = ?";
  connection.query(sql, [course_id,email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
});
});


app.get("/getInstituteList", (request, response) => {
  let sql = "SELECT * from institute_details";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});

app.get("/getInstituteDetails/:id/:email", (request, response) => {
    const institute_id = request.params.id;
    const email = request.params.email;

           
  let sql = "SELECT * FROM institute_details WHERE institute_id = ? OR email = ? ";
  connection.query(sql, [institute_id,email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});

app.get("/getInstituteDetailsbyEmail/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT * FROM institute_details WHERE email = ? ";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});

app.get("/purchasecoursebystudent/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT p.purchase_id,p.student_id,p.purchase_date,p.fee_paid,c.courseid,c.course_name, c.course_duraton,c.course_fee,c.status,c.mode,c.timing,c.course_medium,c.start_date,c.end_date,c.discount FROM purchase_course p INNER JOIN course_details c ON p.course_id = c.courseid WHERE p.email = ?";
  connection.query(sql, [email], (error, results) => {
    if (error) {
     console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});


app.get("/enquiryTutorByStudent/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT e.enquiry_id, e.email, e.fee as tutor_fee, e.status, e.contact, e.tutor_id, e.creation_date, e.name, e.number_of_student, t.teacher_id, t.name, t.qualification, t.email, t.contact, t.discription, t.address, t.city, t.city_name, t.state, t.state_name, t.available_on, t.experience, t.creation_date, t.institute_id, t.course_id, t.medium, t.max_hours, t.stream, t.gender FROM tutor_enquiry e INNER JOIN home_teacher t ON e.tutor_id = t.teacher_id WHERE e.email = ?";
  connection.query(sql, [email], (error, results) => {
    if (error) {
     console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});

app.get("/tutorEnquirybyteacher/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT e.enquiry_id, e.status, e.number_of_student, e.tutor_id, e.fee as tutor_fee, e.creation_date, e.name, e.number_of_student, t.teacher_id, t.name, t.qualification, t.email, t.contact, t.discription, t.address, t.city, t.city_name, t.state, t.state_name, t.available_on, t.experience, t.creation_date, t.institute_id, t.course_id, t.medium, t.max_hours, t.stream, t.gender, t.fee , s.student_name , s.email as student_email, s.address as student_add , s.state as student_state ,s.city as student_city, s.contact as student_contact, s.student_class FROM tutor_enquiry e INNER JOIN home_teacher t ON e.tutor_id = t.teacher_id INNER JOIN student_details s ON e.email = s.email WHERE t.email = ?";
  connection.query(sql, [email], (error, results) => {
    if (error) {
     console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});


app.get("/getStudentByEMail/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT * FROM student_details WHERE email = ? ";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});

app.get("/getTutorByEMail/:institute_id/:email", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT * FROM home_teacher WHERE email = ? ";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});


 app.get("/countTutorDashboard/:tutorId", (request, response) => {
    const tutorId = request.params.tutorId;
           
  let sql = "SELECT (SELECT COUNT(*) FROM tutor_enquiry Where tutor_id = 1) AS total , (SELECT COUNT(*) FROM tutor_enquiry where status = 'paid' AND tutor_id = 1) AS totalPaid, (SELECT COUNT(*) FROM tutor_enquiry WHERE status = 'fee' AND tutor_id = 1) AS feetopay , (SELECT COUNT(*) FROM tutor_enquiry Where status = 'Enquiry' AND tutor_id = 1) AS totalenquiry";
  connection.query(sql, [tutorId,tutorId,tutorId,tutorId], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error retriving tutor_enquiry to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});


app.get("/countCoursepurchased/:institute_id", (request, response) => {
    const institute_id = request.params.institute_id;
           
  let sql = "SELECT course_id , COUNT(course_id) as totalpurchase FROM purchase_course WhERE institute_id = ? GROUP BY course_id";
  connection.query(sql, [institute_id], (error, results) => {
    if (error) {
     return response.status(500).json({
          message: "Error retriving tutor_enquiry to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});


    app.get("/countHomepage", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT (SELECT COUNT(*) FROM institute_details) AS instituteTotal, (SELECT COUNT(*) FROM student_details) AS studentTotal, (SELECT COUNT(*) FROM home_teacher) AS tutorCount , (SELECT COUNT(*) FROM course_details) AS courseTotal , (SELECT COUNT(*) FROM purchase_course) AS purchaseTotal";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});

 app.get("/countInstituteData/:institute_id", (request, response) => {
    const institute_id = request.params.institute_id;
           
  let sql = " SELECT (SELECT COUNT(DISTINCT student_id ) FROM purchase_course where institute_id = ?) AS studentEnrolled,(SELECT COUNT(*) FROM course_details WHERE institute_id = ? AND mode = 'offline') AS courseTotalOffline,(SELECT COUNT(*) FROM course_details WHERE institute_id = ? AND mode = 'online') AS courseTotalOnline , (SELECT COUNT(*) FROM purchase_course where institute_id = ?) AS purchaseTotal ;  ";
  connection.query(sql,  [institute_id, institute_id, institute_id, institute_id], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
});

app.get("/reporthome/:status", (request, response) => {
  let teachersql = "SELECT * from home_teacher";
  let institutesql = "SELECT * from institute_details";
  let studentsql = "SELECT s.student_id, s.student_name, c.name  AS city_name, st.name AS state_name, s.student_class, s.creation_date FROM student_details s LEFT JOIN districts c  ON s.city = c.city_code LEFT JOIN states st ON s.state = st.state_code";
  let coursesql = "SELECT c.course_details, c.course_name, c.course_duraton , c.timing , c.course_medium , c.mode , c.course_fee,  c.start_date, c.end_date, i.institute_name FROM course_details c INNER JOIN institute_details i ON c.institute_id = i.institute_id ";
  const status = request.params.status;

  if( status === "1")
  {
  connection.query(teachersql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving districts from database.");
    } 
    response.json(results);
  });
  }else if(status === "2")
  {
     connection.query(institutesql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving districts from database.");
    } 
    response.json(results);
  });
  }
else if(status === "3")
{
   connection.query(studentsql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving students from database.");
    } 
  response.json(results);
    });
}
else{
   connection.query(coursesql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving districts from database.");
    } 
    response.json(results);
    });
}

  
});




app.get("/listForDashboardCount/:institute_id/:status", (request, response) => {
  const institute_id = request.params.institute_id;
  const status = request.params.status;

  let onlineCourse = "SELECT * from course_details WHERE institute_id = ? AND mode = 'online'";
  let offlineCourse = "SELECT * from course_details WHERE institute_id = ? AND mode = 'offline'";
  let studentList = "SELECT DISTINCT s.email , s.contact , s.student_name , s.address , c.name as city_name , st.name as state_name FROM student_details s INNER JOIN purchase_course i ON s.student_id = i.student_id LEFT JOIN districts c  ON s.city = c.city_code LEFT JOIN states st ON s.state = st.state_code where i.institute_id = ?";
  let purchaselist = "SELECT c.course_name, c.course_duraton, c.course_details, s.email , s.contact , s.student_name from course_details c  INNER JOIN purchase_course i ON c.courseid = i.course_id  INNER JOIN student_details s ON s.student_id = i.student_id  where i.institute_id = ? ";

  if( status === "1")
  {
  connection.query(onlineCourse,[institute_id], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
  }else if(status === "2")
  {
     connection.query(offlineCourse,[institute_id], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
  });
  }
else if(status === "3")
{
   connection.query(studentList,[institute_id], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
  response.json(results);
    });
}
else{
   connection.query(purchaselist,[institute_id], (error, results) => {
    if (error) {
      return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
    response.json(results);
    });
}

  
});


app.get("/getDistrictsData", (request, response) => {
  let sql = "SELECT * from districts";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving districts from database.");
    } 
    response.json(results);
  });
});

app.get("/getStateData", (request, response) => {
  let sql = "SELECT * from states";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});

app.get("/getTutorData", (request, response) => {
  let sql = "SELECT * from home_teacher";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});

// file upload endpoint
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filename = req.file.originalname;
    const mimetype = req.file.mimetype;
    const filePath = req.file.path; // Temporary path

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        const sql = 'INSERT INTO files (file_name, mime_type, data, upload_date) VALUES (?,?,?, NOW())';
        connection.query(sql, [filename, mimetype, data], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file to database.');
            }
            // Clean up temporary file
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting temporary file:', err);
            });
            res.status(200).send('File uploaded successfully!');
        });
    });
});


  app.get('/files/:id', async (req, res) => {
        try {
            const fileId = req.params.id;
            const [rows] =  connection.execute('SELECT file_name, mime_type, data, id, upload_date FROM files WHERE id = ?', [fileId]);

            if (rows.length === 0) {
                return res.status(404).json({ message: 'File not found' });
            }

            res.json(rows[0]); // Return file metadata
        } catch (error) {
            console.error('Error fetching file metadata:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


app.get("/userlogin/:login_id/:password/:roll_id", (req, response) => {

          const login_id = req.params.login_id;
            const password = req.params.password;
            const roleId = req.params.roll_id;

  let sql = "SELECT * FROM login WHERE login_id = ? AND password = ? AND roll_id = ?";
  connection.query(sql, [login_id,password,roleId], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
});

   
   
app.post("/saveCourseData", (request, response) => {
  const {courseid, 
    course_name, 
    course_duraton, 
    course_fee, 
    status, 
    mode, timing, 
    course_medium, 
    start_date, 
    end_date, 
    discount,
    max_student, 
    course_details,
    creation_date} = request.body;
  let sql = "INSERT INTO course_details ( course_name, course_duraton, course_fee, status, mode, timing, course_medium, start_date, end_date, discount,max_student,course_details, creation_date) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?)";   
  connection.query(sql, [
    course_name, 
    course_duraton, 
    course_fee, 
    status, 
    mode, timing, 
    course_medium, 
    start_date, 
    end_date, 
    discount,
     max_student, 
    course_details, 
    creation_date], (error, results) => {
    if (error) {
      return response.status(500).send("Error saving course_details to database.");
    } 
    response.status(201).send(`Note added with ID: ${results.insertId}`);
  });
});

app.post("/saveInstituteData", (request, response) => {
  const {
    institute_name,
    institute_discription,
    institute_logo,
    email,
    contact,
    address,
    state,
    city,
    pincode,
    vision,
    creation_date
  } = request.body;

  const sql = `
    INSERT INTO institute_details 
    ( institute_name, institute_discription, institute_logo, email, contact, address, state, city, pincode, vision, creation_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      institute_id,
      institute_name,
      institute_discription,
      institute_logo,
      email,
      contact,
      address,
      state,
      city,
      pincode,
      vision,
      creation_date
    ],
    (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
      }

      response.status(201).send(`Institute added with ID: ${results.insertId}`);
    }
  );
});





app.post('/registerInstitute',  (req, res) => {
  const rollId ="1";
  const {
    institute_name,
    institute_discription,
    institute_logo,
    email,
    contact,
    address,
    state,
    city,
    pincode,
    vision,
    creation_date,
    entry_date
  } = req.body;

  try {
    // 1. Start a transaction (method depends on your library)
     connection.beginTransaction();

    // 2. Insert into the first table (e.g., 'orders')
     const sql = `INSERT INTO institute_details (institute_name, institute_discription, institute_logo, email, contact, address, state, city, pincode, vision, creation_date,entry_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const sqlResult = connection.query(sql, [institute_name,
      institute_discription,
      institute_logo,
      email,
      contact,
      address,
      state,
      city,
      pincode,
      vision,
      creation_date,entry_date]);
    const sqlId = sqlResult.insertId; // Get the ID of the newly inserted order

    const loginSql = `INSERT INTO login (login_id, password, roll_id, logindate) VALUES (?, ?, ?, ?)`

    // 4. Insert multiple records into the second table
     connection.query(loginSql, [email,contact,rollId,creation_date]);

    // 5. Commit the transaction if all inserts were successful
     connection.commit();

    res.status(201).send({ message: 'Login Id created successfuly' ,sqlId});
  } catch (error) {
    // 6. Rollback the transaction in case of any error
     connection.rollback();
    console.error(error);
    res.status(500).send({ message: 'Failed to register institute ', error: error.message });
  }
});




app.post('/registerTutor',  (req, res) => {
  const rollId ="3";
  const {
     name, email, contact, creation_date
  } = req.body;

  try {
    // 1. Start a transaction (method depends on your library)
     connection.beginTransaction();

    // 2. Insert into the first table (e.g., 'orders')
     const sql = `INSERT INTO home_teacher ( name, email, contact, creation_date) 
    VALUES (?, ?, ?, ?)`;
    const sqlResult = connection.query(sql, [ name, email, contact, creation_date]);
    const sqlId = sqlResult.insertId; // Get the ID of the newly inserted order

    const loginSql = `INSERT INTO login (login_id, password, roll_id, logindate) VALUES (?, ?, ?, ?)`

    // 4. Insert multiple records into the second table
     connection.query(loginSql, [email,contact,rollId,creation_date]);

    // 5. Commit the transaction if all inserts were successful
     connection.commit();

    res.status(201).send({ message: 'Login Id created successfuly' ,sqlId});
  } catch (error) {
    // 6. Rollback the transaction in case of any error
     connection.rollback();
    console.error(error);
    res.status(500).send({ message: 'Failed to register institute ', error: error.message });
  }
});


app.post("/saveStudentData", (request, response) => {
  const {student_id, student_name, email, contact, address, state, city, student_class, student_pic, creation_date} = request.body;

  const sql = `
    INSERT INTO student_details 
    (student_id, student_name, email, contact, address, state, city, student_class, student_pic, creation_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [student_id, student_name, email, contact, address, state, city, student_class, student_pic, creation_date],
    (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
      }

      response.status(201).send(`students added with ID: ${results.insertId}`);
    }
  );
});

app.delete("/:id", (request, response) => {
  const id = request.params.id;
  let sql = "DELETE FROM notes WHERE id = ?";   
  connection.query(sql, [id], (error, results) => {
    if (error) {
      return response.status(500).send("Error deleting note from database.");
    } 
    response.send(`Note deleted with ID: ${id}`);
  });
});

// Update a institute profile
app.post('/updateinstitute/:id', (req, res) => {
  const { id } = req.params;
  const {institute_name,
    institute_discription,
    institute_logo,
    address,
    state,
    state_name,
    city,
    city_name,
    pincode,
    vision,
    creation_date } = req.body;
  connection.query('UPDATE institute_details SET  institute_name = ?, institute_discription = ?, institute_logo = ?, address = ?, state = ?, state_name = ?, city = ?, city_name = ? , pincode = ?, vision = ?, creation_date  = ? WHERE institute_id = ?', [institute_name,
    institute_discription,
    institute_logo,
    address,
    state,
    state_name,
    city,
    city_name,
    pincode,
    vision,
    creation_date, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Institute updated successfully' });
  });
});


app.post('/updateCourseData/:id', (req, res) => {
  const { id } = req.params;

  const {
    course_name,
    course_duraton,
    course_fee,
    status,
    mode,
    timing,
    course_medium,
    start_date,
    end_date,
    discount,
    course_details,
    max_student,
    avail_seat
  } = req.body;

  const sql = `
    UPDATE course_details SET
      course_name = ?,
      course_duraton = ?,
      course_fee = ?,
      status = ?,
      mode = ?,
      timing = ?,
      course_medium = ?,
      start_date = ?,
      end_date = ?,
      discount = ?,
      course_details = ?,
      max_student = ?,
      avail_seat = ?
    WHERE courseid = ?
  `;

  connection.query(sql, [
    course_name,
    course_duraton,
    course_fee,
    status,
    mode,
    timing,
    course_medium,
    start_date,
    end_date,
    discount,
    course_details,
    max_student,
    avail_seat,
    id
  ], (error, results) => {
    if (error) {
      console.error("SQL ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      message: "Course updated successfully",
      affectedRows: results.affectedRows
    });
  });
});



app.post('/updateEnquiryFee/:enquiry_id', (req, res) => {
  const { enquiry_id } = req.params;
  const {
    fee,
    status,
    payment_date
   } = req.body;
  connection.query('UPDATE tutor_enquiry SET  fee = ? , status = ?, payment_date = ? WHERE enquiry_id = ?', [fee,
    status,payment_date,enquiry_id], (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
      }
    res.json({ message: 'enquiry Fee updated successfully' });
  });
});



app.get("/getLoginData", (request, response) => {
  let sql = "SELECT login_id from login";
  connection.query(sql, (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving course from database.");
    } 
    response.json(results);
  });
});

app.post('/updatePassword/:email', (req, res) => {
  const { email } = req.params;
  const {
    newpassword
   } = req.body;
  connection.query('UPDATE login SET  password = ? WHERE login_id = ?', [newpassword,email], (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
      }
    res.json({ message: 'Password updated successfully' });
  });
});


app.post('/updateTutorDetails/:id', (req, response) => {
  const { id } = req.params;
  const {name,
    contact,
      qualification,
      discription,
      address,
      city,
      city_name,
      state,
      state_name,
      available_on,
      experience,
      creation_date,
      medium,
      stream ,
      max_hours
       } = req.body;
  connection.query('UPDATE home_teacher SET  name = ?, contact = ?, qualification = ?, discription = ?, address = ?, city = ?, city_name = ?, state = ?, state_name = ?, available_on = ?, experience = ?, creation_date = ? , medium = ? , stream = ? , max_hours = ? WHERE teacher_id = ?',
     [name,
      contact,
      qualification,
      discription,
      address,
      city,
      city_name,
      state,
      state_name,
      available_on,
      experience,
      creation_date,
      medium,
      stream ,
      max_hours,
       id], (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving tutor to database",
          error: error.message
        });
      }

      response.status(201).send(`tutor added with ID: ${results.insertId}`);
    }

);
});






app.post('/updateStudentProfile/:id', (req, res) => {
  const { id } = req.params;
  const {student_name, 
    email, 
    contact, 
    address, 
    state, 
    city, 
    student_class,
       } = req.body;
  connection.query('UPDATE student_details SET  student_name = ?, contact = ?,address = ?, state = ?, city = ?, student_class = ?  WHERE email = ?',
     [student_name,
    contact, 
    address, 
    state, 
    city, 
    student_class,
       id], (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return res.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
      }

      res.status(201).send(`students added with ID: ${results.insertId}`);
    }
  )
  })



app.post('/purchaseCourseInside', (req, response) => {
  const { id } = req.params;
  const { institute_id, 
      student_id,
      course_id, 
       purchase_date,
      fee_paid, 
       email, 
       contact
       } = req.body;
  connection.query('INSERT INTO purchase_course (institute_id,student_id, email, course_id, contact, purchase_date, fee_paid) VALUES (?, ?, ?, ?, ?, ?,?)',
     [institute_id, 
      student_id,
       email, 
      course_id, 
      contact,
       purchase_date,
      fee_paid, 
       id], (error, results) => {
      if (error) {
        console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving student_details to database",
          error: error.message
        });
      }

      response.status(201).send(`students added with ID: ${results.insertId}`);
    }

);
});


app.post('/purchaseCourse', (req, res) => {
  const rollId = "2";

  const {
    institute_id,
    course_id,
    purchase_date,
    fee_paid,
    student_name,
    email,
    contact,
    creation_date
  } = req.body;

  connection.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    const purchaseSql = `
      INSERT INTO purchase_course 
      (institute_id, email, course_id, contact, purchase_date, fee_paid)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      purchaseSql,
      [institute_id, email, course_id, contact, purchase_date, fee_paid],
      (err, purchaseResult) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json(err);
          });
        }

        const purchaseId = purchaseResult.insertId;

        const loginSql = `
          INSERT INTO login (login_id, password, roll_id, logindate)
          VALUES (?, ?, ?, ?)
        `;

        connection.query(
          loginSql,
          [email, contact, rollId, creation_date],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json(err);
              });
            }

            const studentSql = `
              INSERT INTO student_details (student_name, email, contact, creation_date)
              VALUES (?, ?, ?, ?)
            `;

            connection.query(
              studentSql,
              [student_name, email, contact, creation_date],
              (err) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json(err);
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json(err);
                    });
                  }

                  res.status(201).json({
                    message: "Purchase & student created successfully",
                    purchaseId
                  });
                });
              }
            );
          }
        );
      }
    );
  });
});




app.post('/studentEnquery', (req, res) => {
  const rollId = "2";

  const {
    name,
    email,
    contact,
    password,
    tutor_id,
    status,
    creation_date,
    noOfStudents,
  } = req.body;

  connection.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    const purchaseSql = `INSERT INTO tutor_enquiry (name, email, status, contact, tutor_id, creation_date,number_of_student) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      purchaseSql,
      [ name,email,status, contact, tutor_id,creation_date,noOfStudents],
      (err, purchaseResult) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json(err);
          });
        }

        const purchaseId = purchaseResult.insertId;

        const loginSql = `INSERT INTO login (login_id, password, roll_id, logindate) VALUES (?, ?, ?, ?) `;

        connection.query(
          loginSql,
          [email, password, rollId, creation_date],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json(err);
              });
            }

            const studentSql = `INSERT INTO student_details (student_name, email, contact, creation_date)VALUES (?, ?, ?, ?) `;

            connection.query(
              studentSql,
              [name, email, contact, creation_date],
              (err) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json(err);
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json(err);
                    });
                  }

                  res.status(201).json({
                    message: "enquiry & student created successfully",
                    purchaseId
                  });
                });
              }
            );
          }
        );
      }
    );
  });
});
