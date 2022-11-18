# WeUsThemContacts

To run this application, we first need to install all the packages to do so use npm install in the console <br> 
while in the applications folder from there we you need to set up mongoDB you should be able to select all the <br>
free options in creating a cluster. From there click connect and then connect to application and <br>
grab the connection string for the db and place it within the .env  file You should then be able to run <br>
the application using npm start <br>

The following are the routes within the api

Get All Contacts<BR>
GET Request <BR>
http://localhost:3000/contact/ <BR><BR>
  
Delete One Contact<BR>
DELETE Request <BR>
http://localhost:3000/contact/ + _id <BR> <BR>
  
Update One Contact<BR>
PUT Request <BR>
http://localhost:3000/contact/ + _id <BR><BR>
  
Get One Contact<BR>
GET Request <br>
http://localhost:3000/contact/ + _id <BR><BR>
  
Get One Image<BR>
GET Request <br>
http://localhost:3000/uploads + fileName<BR>

