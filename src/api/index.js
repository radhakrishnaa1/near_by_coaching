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
  let sql = "INSERT INTO course_details ( course_name, course_duraton, course_fee, status, mode, timing, course_medium, start_date, end_date, discount,max_student,course_details, creation_date) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?)";   
  connection.query(sql, [courseid, 
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
  } = request.body;

  const sql = `
    INSERT INTO institute_details 
    (institute_id, institute_name, institute_discription, institute_logo, email, contact, address, state, city, pincode, vision, creation_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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



// app.post('/savelogininstitute', (req, res) => {
//   const rollId ="1";
//     const {
//     institute_id,
//     institute_name,
//     institute_discription,
//     institute_logo,
//     email,
//     contact,
//     address,
//     state,
//     city,
//     pincode,
//     vision,
//     creation_date
//   } = req.body;
// //Destructured object
//     const car_info_query = `INSERT INTO institute_details (institute_id, institute_name, institute_discription, institute_logo, email, contact, address, state, city, pincode, vision, creation_date) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
//     const sales_info_query = `INSERT INTO login (login_id, password, roll_id, logindate) VALUES (?, ?, ?, ?)`
    
//     let write_car_info = connection.query(car_info_query, [institute_id,
//     institute_name,
//     institute_discription,
//     institute_logo,
//     email,
//     contact,
//     address,
//     state,
//     city,
//     pincode,
//     vision,
//     creation_date] , (err, result) => {
//         if (err) throw err;
//     });
//     let write_sales_info = connection.query(sales_info_query, [email, contact, rollId,creation_date], (err, result) => {
//         if (err) throw err
//     })
//     //Insert into as many tables as you want
//     res.status(201).send({ message: 'Institute registered successfully',write_sales_info });
// });

app.post('/registerInstitute',  (req, res) => {
  const rollId ="1";
  const {
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
  } = req.body;

  try {
    // 1. Start a transaction (method depends on your library)
     connection.beginTransaction();

    // 2. Insert into the first table (e.g., 'orders')
     const sql = `INSERT INTO institute_details (institute_id, institute_name, institute_discription, institute_logo, email, contact, address, state, city, pincode, vision, creation_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const sqlResult = connection.query(sql, [institute_id,
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
      creation_date]);
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

