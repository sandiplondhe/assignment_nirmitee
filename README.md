## Getting Started

First, run the development server:
-nodemon
## Login and registaration key role.
Open (http://localhost:5000) with your browser/postmon to see the result.

You can check app.js for endpoints.
There are three different roles. (user,admin,super-admin)

For Registarion:
    HTTP POST Method (http://localhost:5000/api/users/register-user)

For login:

-  HTTP POST Method (http://localhost:5000/api/users/login-user)


## For CRUD operation you check following endpoints.

-  HTTP GET Method (http://localhost:5000/api/products/) 
-  HTTP POST Method (http://localhost:5000/api/products/) 
-  For updating or removing product.
     http://localhost:5000/api/products/:productID


## OAuth 
For generation client id and secrete code visit following url.
-  https://console.cloud.google.com/apis/credentials

Open (http://localhost:5000/google) with your browser to see the result.

 
