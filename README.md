This is a vacations management project where employees can login with their credentials and view their current vacation requests as well as its status(approved,pending,declined) and request a new one. 
Managers can login with their own credentials and edit or delete the users(employees) as well as create new users. Finally the manager receives a notification whenever a request for a vacation is submitted and he can
approve or reject it accordingly.


Run instructions: 

To run the project create the database provided with the epignosis_db.sql and check /server/config/database to see whether you have a password or not. By default i have it as username = root and password = ' '

cd client -> npm install -> npm start 

open new terminal 

cd server -> composer install -> php -S localhost:8888
