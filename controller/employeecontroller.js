const { dataSource } = require("../database");

const employeeservice = require("../entity/employee");
const appConst = require("../constants");
const employeeRepo = dataSource.getRepository("Employees");
//post
const employeeadd = async (req, res) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    console.log("transaction is started");
    const resp = await employeeRepo.save(req.body);
    await queryRunner.commitTransaction();
    console.log("data inserted successfully");
    res.status(200).json({
      status: appConst.status.success,
      response: resp.count,
      message: "successful",
    });
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("error");
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  } finally {
    queryRunner.release();
  }
};
//getall employees
const employeefindall = async (req, res) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    console.log("transaction is started");
    const resp = await employeeRepo.find();
    await queryRunner.commitTransaction();
    console.log("data fetched successfully");
    res.send(resp);
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("error");
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  } finally {
    queryRunner.release();
  }
};
//get one employee
const employeeFindByOne = async (req, res) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    console.log("transaction is started");
    const resp = await employeeRepo.findOneBy({ id: req.params.id });
    queryRunner.commitTransaction();
    console.log("data fetched successfully");
    res.send(resp);
  } catch (err) {
    console.log("error rollback");
    await queryRunner.rollbackTransaction();
    console.log("error");
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  } finally {
    queryRunner.release();
  }
};
//delete employee
const deleteEmployee = async (req, res) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    console.log("transaction is started");
    const resp = await employeeRepo.delete({ id: req.params.id });
    await queryRunner.commitTransaction();
    console.log("data deleted successfully");
    res.send(resp);
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("error");
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  } finally {
    queryRunner.release();
  }
};
//update employee
const updateEmployee = async (req, res) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    console.log("transaction is started");
    const id = req.params.id;
    
    const resp = await employeeRepo.update({ id: id }, req.body);
    await queryRunner.commitTransaction();
    console.log("transaction is committed");
    res.send(resp);
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("rollback transaction");
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  } finally {
    queryRunner.release();
  }
};


module.exports = {
  employeeadd,
  employeefindall,
  employeeFindByOne,
  deleteEmployee,
  updateEmployee 
};
