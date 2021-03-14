const express = require("express");
const Employee = require("../models/employee.model.js");


//get all employees
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
      if (err)
        res.status(500).send({
         err
        });
      else res.send(data);
    });
  };

exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Employee with id " + req.params.id
          });
        }
      } else res.send({ message: `Employee was deleted successfully!` });
    });
  };
exports.create = (req,res) => {
 
  if(!req.body){
    res.status(400).send({
      message: "Body is empty!"
    });
  }
  else{
    const employee = new Employee({
      EMPID:req.body.EMPID,
      NAME: req.body.NAME,
      EMPCODE: req.body.EMPCODE,
      SALARY: req.body.SALARY
    });

    Employee.create(employee,(err,data)=>{
      if (err)
      res.status(500).send({
        message:
          err.message || "Error Caused"
      });
    else res.send(data);
    })
  }
}

exports.update = (req,res)=>{
if(!req.body){
  res.status(400).send({
    message: "body cannot be empty!"
  });

}
else{


  

  Employee.updateById(
    
    parseInt(req.params.id) ,
    new Employee(req.body),(err,data)=>{
      if(err){
        if(err.kind === "not_found"){
          res.status(404).send({
          message: `Not found Employee with id ${req.params.EMPID}.`
        });
        }
        else{
          res.status(500).send({
            message: "Error updating employee with id " + req.params.EMPID
          });
        }

      }
      else{
        res.send(data);
      }
    }
  )
}

}


