import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
const validateNewUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
const validateAddTask = (data) => {
  const schema = Joi.object({
    taskTitle: Joi.string().required().label("Task Title"),
    taskDetails: Joi.string().label("Task details"),
    taskTime: Joi.number().label("Task Time"),
    id: Joi.string().label("Task id"),
  });
  return schema.validate(data);
};
const validateUpdateTask = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().label("Task id"),
    taskTitle: Joi.string().label("Task Title"),
    taskDetails: Joi.string().label("Task details"),
    taskTime: Joi.date().label("Task Time"),
  });
  return schema.validate(data);
};
const validateDeleteTask = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().label("Task id"),
  });
  return schema.validate(data);
};
export {
  validateNewUser,
  validateLogin,
  validateAddTask,
  validateUpdateTask,
  validateDeleteTask,
};
