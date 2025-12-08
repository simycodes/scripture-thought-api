# TO RUN THE API SERVER ON YOUR LOCAL MACHINE, HAVE THE FOLLOWING SETUP ON YOUR 
# LOCAL SERVER PROJECT IN THE .env file

# 1. .env file, WITH BELOW VALUES
# AS PROJECT PROGRESSES WITH ALL DB MODELS SET, CONSIDER SETTING UP YOUR OWN MONGO_URL
NODE_ENV=development
PORT=5000
MONGO_URL=mongodb+srv://simy:reactnodecoding@nodeexpressprojects.hnksqmf.mongodb.net/scripture-thought-api?appName=NodeExpressProjects

# AUTHENTICATION WITH JWT, ADD/SET THE VALUE BELOW
JWT_SECRET=authentification101
JWT_EXPIRES_IN=1d

# npm run dev, RUNS THIS SERVER API
# cd client-frontend, npm run dev, RUNS THE FRONTEND REACT APP - RUN BOTH TO ACCESS
# THE APP (REGISTER,LOGIN ETC)
API: http://localhost:5000/  
[SEE BOTTOM OF PAGE FOR THE SCRIPTURE THOUGHT ROUTES TO BE USED IN POSTMAN SOFTWARE TO 
RUN THE SCRIPTURE-THOUGHT API]
REACT FRONT-END APP: http://localhost:5173/

# REGISTER TO VIEW AND EXPERIENCE FULL APP (API AND REACT CLIENT) FUNCTIONALITY
# REGISTER NEW USER ON REGISTER PAGE OR USE THE CREDENTIALS BELOW (IF USING THE
# DATABASE CONNECTION STRING ABOVE)
EMAIL: mulenga@gmail.com
PASSWORD: pass1234

# NOTE: ENSURE ALL ENV VALUES ARE CORRECTLY SET AND THERE IS AN ACTIVE CONNECTION TO
# THE MONGODB ATLAS ONLINE DATABASE


# SCRIPTURE THOUGHT ROUTES TO BE USED IN POSTMAN SOFTWARE TO RUN THE
# SCRIPTURE-THOUGHT API

# AUTH ROUTES
- REGISTER: http://localhost:5000/api/v1/auth/register
{
  "name": "<your-first-name-here>",
  "lastName": "<your-last-name-here>"
  "email": "<your-email-here>",
  "password": "<your-password-here>",
} 
- LOGIN: http://localhost:5000/api/v1/auth/login
{
  "email": "<your-email-here>",
  "password": "<your-password-here>"
}

# USER ROUTES (LOGGED IN)
- READ: http://localhost:5000/api/v1/users/current-user
- UPDATE: http://localhost:5000/api/v1/users/update-user
{
  "name": "<your-first-name-here>",
  "lastName": "<your-last-name-here>"
  "email": "<your-email-here>",
} 

# SCRIPTURE-THOUGHT CRUD
- CREATE: http://localhost:5000/api/v1/scripture-thoughts/create-thought
{
  "description": "God loves everyone",
  "scriptureVerse": "John 3:16",
  "thought": "This scripture inspires me to always love others, even when its challenging to do so"
}
- READ: http://localhost:5000/api/v1/scripture-thoughts/get-all-thoughts
- READ: http://localhost:5000/api/v1/scripture-thoughts/get-thought/<valid-scripture-thought-_id-here>
- UPDATE: http://localhost:5000/api/v1/scripture-thoughts/update-thought/<valid-scripture-thought-_id-here>
{
  "description": "God loves everyone-UPDATED",
  "scriptureVerse": "John 3:16",
  "thought": "This scripture inspires me to always love others, even when its challenging to do so"
}
- DELETE: http://localhost:5000/api/v1/scripture-thoughts/update-thought/<valid-scripture-thought-_id-here>


# COMMENT CRUD
- CREATE: http://localhost:5000/api/v1/comments
{
  "thoughtId": "<valid-scripture-thought-_id-here>",
  "comment": "Amen!",
  "name": "<first-name-of-logged-in-user>",
  "lastName": "<last-name-of-logged-in-user>"
}
- READ: http://localhost:5000/api/v1/comments/<valid-scripture-thought-_id-here>
- READ: http://localhost:5000/api/v1/comments/get-single-comment/<valid-comment-_id-here>
- UPDATE: http://localhost:5000/api/v1/comments/<valid-comment-_id-here>
{
  "comment": "Amen-updated!"
}
- DELETE: http://localhost:5000/api/v1/comments/<valid-comment-_id-here>


