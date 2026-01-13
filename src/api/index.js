import express from "express";
import { connection } from "./database.js";
import cors from 'cors';
import multer from "multer";
import fs from "fs-extra"; 
const app = express ();
app.use(express.json());
app.use(cors())
const PORT = 3004;

const upload = multer({ dest: 'uploads/' }); 

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
           
  let sql = "SELECT e.enquiry_id, e.email, e.status, e.contact, e.tutor_id, e.creation_date, e.name, t.teacher_id, t.name, t.qualification, t.email, t.contact, t.discription, t.address, t.city, t.city_name, t.state, t.state_name, t.available_on, t.experience, t.creation_date, t.institute_id, t.course_id, t.medium, t.max_hours, t.stream, t.gender, t.fee FROM tutor_enquiry e INNER JOIN home_teacher t ON e.tutor_id = t.teacher_id WHERE e.email = ?";
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

//    app.get("/filterHome", (request, response) => {
//     const email = request.params.email;
           
//   let sql = "SELECT (SELECT institute_id ,  FROM institute_details) AS instituteTotal, (SELECT COUNT(*) FROM student_details) AS studentTotal, (SELECT COUNT(*) FROM course_details) AS courseTotal , (SELECT COUNT(*) FROM purchase_course) AS purchaseTotal";
//   connection.query(sql, [email], (error, results) => {
//     if (error) {
//       return response.status(500).send("Error retrieving login from database.");
//     } 
//     response.json(results);
//   });
// });


    app.get("/countHomepage", (request, response) => {
    const email = request.params.email;
           
  let sql = "SELECT (SELECT COUNT(*) FROM institute_details) AS instituteTotal, (SELECT COUNT(*) FROM student_details) AS studentTotal, (SELECT COUNT(*) FROM course_details) AS courseTotal , (SELECT COUNT(*) FROM purchase_course) AS purchaseTotal";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      return response.status(500).send("Error retrieving login from database.");
    } 
    response.json(results);
  });
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

    //   app.get('/userlogin/:login_id/:password/:roll_id', async (req, res) => {
    //     try {

    //         const [rows] =  connection.execute('SELECT * FROM login WHERE login_id = ? AND password = ? AND roll_id = ?', [login_id,password,roleId]);

    //         if (rows.length === 0) {
    //             return res.status(404).json({ message: 'User Not Found' });
    //         }

    //         res.json(rows[0]); // Return file metadata
    //     } catch (error) {
    //         console.error('Error fetching login data:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // });
   
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
    city,
    pincode,
    vision,
    creation_date,entry_date } = req.body;
  connection.query('UPDATE institute_details SET  institute_name = ?, institute_discription = ?, institute_logo = ?, address = ?, state = ?, city = ?, pincode = ?, vision = ?, creation_date  = ? , entry_date = ? WHERE institute_id = ?', [institute_name,
    institute_discription,
    institute_logo,
    address,
    state,
    city,
    pincode,
    vision,
    creation_date,entry_date, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Institute updated successfully' });
  });
});


app.post('/updateTutorDetails/:id', (req, response) => {
  const { id } = req.params;
  const {name,
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
  connection.query('UPDATE home_teacher SET  name = ?, qualification = ?, discription = ?, address = ?, city = ?, city_name = ?, state = ?, state_name = ?, available_on = ?, experience = ?, creation_date = ? , medium = ? , stream = ? , max_hours = ? WHERE email = ?',
     [name,
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
          message: "Error saving student_details to database",
          error: error.message
        });
      }

      response.status(201).send(`students added with ID: ${results.insertId}`);
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
       id], (error,results) => {
   if (error) {
     console.error("SQL ERROR:", error);  // logs actual error
        return response.status(500).json({
          message: "Error saving institute_details to database",
          error: error.message
        });
    } 
     
  }

);
});



// app.post('/purchaseCourse',  (req, res) => {
//   const rollId ="2";
//   // purchase_id
  
//   const {
//      institute_id,
//      student_id,
//      course_id,
//       purchase_date, 
//       fee_paid, 
//      student_name, 
//      email, 
//      contact, 
//     creation_date
//   } = req.body;

//   try {
//     // 1. Start a transaction (method depends on your library)
//      connection.beginTransaction();

//     // 2. Insert into the first table (e.g., 'orders')
//      const sql = `INSERT INTO purchase_course (institute_id,email,course_id,contact, purchase_date, fee_paid ) 
//     VALUES (?, ?, ?, ?, ?, ?)`;
//     const sqlResult = connection.query(sql, [institute_id,email ,course_id,contact, purchase_date, fee_paid]);
//     const sqlId = sqlResult.insertId; // Get the ID of the newly inserted order

//     const loginSql = `INSERT INTO login (login_id, password, roll_id, logindate) VALUES (?, ?, ?, ?)`

//     // 4. Insert multiple records into the second table
//      connection.query(loginSql, [email,contact,rollId,creation_date]);

//  const studentSql = `INSERT INTO student_details (student_name, email, contact, creation_date) VALUES ( ?, ?, ?,?)`

//     // 4. Insert multiple records into the second table
//      connection.query(studentSql, [student_name, email,contact,creation_date]);

//     // 5. Commit the transaction if all inserts were successful
//      connection.commit();

//     res.status(201).send({ message: 'Login Id created successfuly' ,sqlId});
//   } catch (error) {
//     // 6. Rollback the transaction in case of any error
//      connection.rollback();
//     console.error(error);
//     res.status(500).send({ message: 'Failed to register institute ', error: error.message });
//   }
// });


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
    creation_date
    
  } = req.body;

  connection.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    const purchaseSql = `INSERT INTO tutor_enquiry (name, email, status, contact, tutor_id, creation_date) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(
      purchaseSql,
      [ name,email,status, contact, tutor_id,creation_date],
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
