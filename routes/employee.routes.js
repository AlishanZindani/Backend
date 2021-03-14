module.exports = app => {
const employees = require("../controllers/employee.controller.js");
//to get list of all employees
app.get("/api/employees", employees.findAll);


//delete specific employee from db
app.delete('/api/employees/:id',employees.delete);

// post req to create new employee
app.post('/api/employees',employees.create);


//update employee with given id
app.put('/api/employees/:id', employees.update);
  
};
  