# Notification Server

Handles notification request from TokenIQ login page.

# For Capstone

## View Users

Go to https://tokeniq.herokuapp.com to see all users and their info.

## Create User

Make POST request to '/create' to create new user.

Expected parameters: 
- username
- password

Example:

`curl -d "username=joe&password=joseph" -X POST https://tokeniq.herokuapp.com/create`

## Save Push Token

Make POST request to '/retrieveToken' to associate push token to user.

Expected parameters:
- username
- password
- pushtoken

Example:

`curl -d "username=joe&password=joseph&pushtoken=1234" -X POST https://tokeniq.herokuapp.com/retrieveToken`


## Notification

Make POST request to '/notify' to trigger FCM.

Expected parameters:
- username
- data [object]

Example: 

`curl -d 'username=joe&data={"code":"1234","expire":"10min"}' -X POST https://tokeniq.herokuapp.com/notify`

## Authentication

Make POST request to '/authenticate' to auth user.

Expected Parameter:
- username
- password

Example:

`curl -d "username=joe&password=joseph" -X POST https://tokeniq.herokuapp.com/authenticate`