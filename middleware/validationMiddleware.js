import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import ScriptureThought from "../models/ScriptureThoughtModel.js";
import Comment from "../models/CommentModel.js";

// FUNCTION TO HANDLE VALIDATION OF EACH INPUT ITEM
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no scripture")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("no comment")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// VALIDATE USER REGISTRATION DATA
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);

// VALIDATE UPDATE USER DATA
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format, Try Again with a valid email address")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("Email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);

// VALIDATE USER LOGIN DATA
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format, Try Again with a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
]);

// VALIDATE INCOMING SCRIPTURE THOUGHT USER DATA
export const validateScriptureThoughtInput = withValidationErrors([
  body("description").notEmpty().withMessage("Thought title(description) is required")
    .isLength({ max: 80 })
    .withMessage("Thought title(description) can not be more than 80 characters"),
  body("scriptureVerse")
    .notEmpty()
    .withMessage("The scripture verse is required, e.g John 3:16")
    .isLength({ max: 80 })
    .withMessage("Scripture verse can not be more than 50 characters"),
  body("thought")
    .notEmpty()
    .withMessage("Your scripture thought is required")
    .isLength({ max: 800 })
    .withMessage("Your scripture thought can not be more than 800 characters"),
]);
    

// VALIDATE THE IDS OF THE INCOMING SCRIPTURE-THOUGHT/ITEM & VERIFY IF SCRIPTURE-THOUGHT EXISTS IN DATABASE
export const validateScriptureThoughtIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new Error("invalid MongoDB id");

    const scriptureThought = await ScriptureThought.findById(value);
    if (!scriptureThought) throw new Error(`no scripture thought with id : ${value}`);
  }),
]);


// VALIDATE INCOMING COMMENT USER DATA
export const validateCommentInput = withValidationErrors([
  body("thoughtId")
    .notEmpty()
    .withMessage("No scripture thought to comment on"),
  body("comment")
    .notEmpty()
    .withMessage("Your comment is required")
    .isLength({ max: 400 })
    .withMessage("Your Comment can not be more than 400 characters"),
]);

// VALIDATE INCOMING COMMENT USER DATA FOR COMMENT UPDATE
export const validateCommentUpdateInput = withValidationErrors([
  body("comment")
    .notEmpty()
    .withMessage("Your comment is required to make an update")
    .isLength({ max: 400 })
    .withMessage("Your Comment can not be more than 400 characters"),
]);

// VALIDATE THE IDS OF THE INCOMING COMMENT/ITEM & VERIFY IF COMMENT EXISTS IN DATABASE
export const validateCommentIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new Error("invalid MongoDB id");

    const comment = await Comment.findById(value);
    if (!comment) throw new Error(`no comment with id : ${value}`);
 
    // Verify if user has authority to access each item from DB/is user is admin (can access all data)
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === comment.userId.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("You are not authorized to access this route(resource)");
  }),
]);


// VALIDATE THE IDS OF THE INCOMING SCRIPTURE-THOUGHT BEFORE CREATING A COMMENT FOR IT
export const validateScriptureThoughtIdInCommentCreation = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const scriptureThoughtId = req.body.thoughtId;

    const isValidMongoId = mongoose.Types.ObjectId.isValid(scriptureThoughtId);
    if (!isValidMongoId) throw new Error("invalid MongoDB id");
  }),
]);

// VALIDATE THE IDS OF THE INCOMING SCRIPTURE-THOUGHT BEFORE GETTING ITS COMMENTS
export const validateScriptureThoughtIdInComment = withValidationErrors([
  param("thoughtId").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new Error("Invalid MongoDB id");
  }),
]);