const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require ('jsonwebtoken');

const csvtojson=require("csvtojson");
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

const Student=require("../model/studentSchema");
const Noti=require("../model/notificationSchema");
const User=require("../model/userSchema");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        bcrypt.compare(password, user.password)
          .then(isValid => {
            if (isValid) {
              const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
              res.json({ message: 'Login successful', token });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          })
          .catch(err => {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Internal server error' });
          });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
  
// token verification
function verifytoken(req,res,next){
  try {
    if(!req.headers.authorization) throw 'Unauthorized';
    let token=req.headers.authorization.split(' ')[1];
    if(!token) throw 'Unauthorized';
    let payload=jwt.verify(token,'secretKey');
    if(!payload) throw 'Unauthorized';
    next()
  } catch (error) {
    res.status(401).send('Error')
  }
}
  
// Csv file upload
router.post('/addcsv',verifytoken,upload.single('csvFile'),async(req,res)=>{
  const csvData=req.file.buffer.toString('utf-8');
  csvtojson()
    .fromString(csvData)
    .then(csvData=>{
      console.log(csvData);
      Student.insertMany(csvData)
        .then(function(){
          console.log("Data Inserted")
          res.json({success:'Data Uploaded'});
      }).catch(function(error){
          console.log(error);
          res.status(500).json({error: 'Error Uploading'})
      });
    });
});
  
// Notification operations
// Add notification
router.post('/addmess',verifytoken, (req,res)=>{
  console.log(req.body);
  const newNoti=new Noti({
    notificationmess:req.body.notificationmess
  });
  newNoti.save()
    .then(()=>{
      res.status(200).json({message:'Message Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add Message'});
    })
})
  
// View notification
router.get('/viewmess',verifytoken,(req,res)=>{
  Noti.find()
  .then((notification)=>{
    res.status(200).json(notification);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});
  
// Delete notification
router.delete('/deletemess/:_id',verifytoken,(req, res) => {
  Noti.findByIdAndRemove(req.params._id)
  .then((notification)=>{
    if (notification){
      res.status(200).json({message:'Message deleted successfully'});
    }else{
      res.status(404).json({error:'Message not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Message'});
  });
});
  
// student crud operations
// Add student
router.post('/addstuds',verifytoken,(req,res)=>{
  console.log(req.body);
  const newStudent=new Student({
    id:req.body.id,
    name:req.body.name,
    course:req.body.course,
    project:req.body.project,
    batch:req.body.batch,
    status:req.body.status,
    placement:req.body.placement
  });
  newStudent.save()
    .then(()=>{
      res.status(200).json({message:'Student Detail Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add detail'});
    })
})
  
// view all students
router.get('/viewstud',verifytoken,(req,res)=>{
  Student.find()
  .then((students)=>{
    res.status(200).json(students);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});
  
// getone student
router.get('/getone/:_id',verifytoken, async (req, res) => {
  try {
    const student = await Student.findById(req.params._id);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data');
  }
});
  
// edit student
router.put('/editstuds/:_id',verifytoken, async (req, res) => {
  try {
      let id = req.params._id
      let updateData = {$set: req.body}
      const updated = await Student.findByIdAndUpdate(id, updateData,{ new: true })
      res.json(updated)
  } catch (error) {
      console.log(error)
      res.send('error')
  }
})
  
// delete student
router.delete('/deleteitem/:_id',verifytoken,(req, res) => {
  Student.findByIdAndRemove(req.params._id)
  .then((student)=>{
    if (student){
      res.status(200).json({message:'Student deleted successfully'});
    }else{
      res.status(404).json({error:'Student not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Student'});
  });
});
  
// User CRUD operations
// Add user
router.post('/api/users',verifytoken, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});
  
// Gell all users
router.get('/api/users',verifytoken, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});
  
// Getone user
router.get('/api/users/:id',verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});
  
// edit user
router.put('/api/users/:id',verifytoken, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name , email, password: hashedPassword, role },
      { new: true }
    );
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});
  
// delete user
router.delete('/api/users/:id',verifytoken, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router