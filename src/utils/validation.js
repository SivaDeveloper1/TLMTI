const Joi = require('joi');

const propertyCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    location: Joi.string().required(),
    type: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/), // Object ID validation
    category: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/), // Object ID validation
    beds: Joi.number().integer().min(1).required(),
    baths: Joi.number().integer().min(1).required(),
    floors: Joi.number().integer().min(1).required(),
    ownerId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
});
const propertyUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(''),
    location: Joi.string(),
    beds: Joi.number().integer().min(1),
    baths: Joi.number().integer().min(1),
    floors: Joi.number().integer().min(1),
    ownerId: Joi.string(),
}).min(1);

const typeCreateSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    slug: Joi.string().required(),
    order: Joi.number().integer().required(),
  });
  
  const typeUpdateSchema = Joi.object({
    name: Joi.string(),
    code: Joi.string(),
    slug: Joi.string(),
    order: Joi.number().integer(),
  }).min(1);
  
  const categoryCreateSchema = Joi.object({
    name: Joi.string().required(),
    nationality: Joi.string().required(),
    order: Joi.number().integer().required(),
    status: Joi.string().required(),
  });
  
  const categoryUpdateSchema = Joi.object({
    name: Joi.string(),
    nationality: Joi.string(),
    order: Joi.number().integer(),
    status: Joi.string(),
  }).min(1);
  
  
  

module.exports = {
    propertyCreateSchema, 
    propertyUpdateSchema,
    typeCreateSchema,
    typeUpdateSchema,
    categoryCreateSchema,
    categoryUpdateSchema,
};
