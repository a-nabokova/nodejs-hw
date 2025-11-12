import { Joi, Segments } from "celebrate";
import { TAGS } from "../constants/tags.js";
import { isValidObjectId } from 'mongoose';


export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be at least {#limit}",
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      "number.base": "perPage must be a number",
      "number.integer": "perPage must be an integer",
      "number.min": "perPage must be at least {#limit}",
      "number.max": "perPage must be at most {#limit}",
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "string.base": "Tag must be a string",
      "any.only": `Tag must be one of the following values: ${TAGS.join(", ")}.`
    }),
    search: Joi.string().trim().allow('').messages({
      "string.base": "Search must be a string",
    })
  })
};


const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),

};

export const updateNoteSchema = {
[Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
}),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow("").optional(),
    tag: Joi.string().valid(...TAGS).optional()
  }).min(1),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "any.required": "Title is required"
    }),
    content: Joi.string().allow('').messages({
      "string.base": "Content must be a string"
    }),
    tag: Joi.string().valid(...TAGS).optional().messages({
      "string.base": "Tag must be a string",
      "any.only": `Tag must be one of the following values: ${TAGS.join(", ")}.`
    })
  })
};
