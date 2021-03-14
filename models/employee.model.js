const sql = require("./db.js");

// constructor
const Employee = function(employee) {
    this.EMPID=employee.EMPID;
    this.NAME = employee.NAME;
    this.EMPCODE = employee.EMPCODE;
    this.SALARY = employee.SALARY;
  };

Employee.getAll = result => {
    sql.query("SELECT * FROM tblEmployee", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Employees: ", res);
      result(null, res);
    });
  };

Employee.remove = (id, result) => {
  sql.query("SELECT NAME FROM tblEmployee WHERE EMPID='"+id+"'",(err,res,fields)=>{
      if(!err){
          if(res.length>0){
              sql.query("DELETE FROM tblEmployee WHERE EMPID='"+id+"'",(err,res,fields)=>{
                  if(!err){
                    result(null, res);
                  }
                  else{
                    result(null, err);
                  }
              });
          }
          else{
            result({ kind: "not_found" }, null);
          }
      }
      else{
          result(null,err);
      }
  });
  };
  Employee.create = (newEmployee,result)=>{
    sql.query("Insert into tblEmployee(NAME,EMPCODE,SALARY) values('"+newEmployee.NAME+"','"+newEmployee.EMPCODE+"',"+newEmployee.SALARY+")",(err,res,fields)=>{
      if(!err){
        result(null,{message:newEmployee.NAME + " Added"});
          
      }
      else
      {
        result(err, null);
        return;
    
      }
  }); 
  
  }
  Employee.updateById = (id,employee,result)=>{
    console.log(id+employee.NAME+employee.EMPCODE+employee.SALARY);
    sql.query("UPDATE tblEmployee SET NAME = '"+employee.NAME+"',EMPCODE='"+employee.EMPCODE+"',SALARY='"+employee.SALARY+"' WHERE EMPID ='"+id+"'",(err,res)=>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      else{
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        else{
          console.log("updated employee: ", { id: id });
          result(null, { message:employee.NAME + " record Updated."});
        }
      }
    })
  }
  
  module.exports = Employee;