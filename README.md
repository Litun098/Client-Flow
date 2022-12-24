### CRM Application backend

#### Install required packages
```
    npm i
```
#### Start Application
``` 
    npm start
```


#### Sign up User

``` http
    POST localhost:3000//crm/api/auth/signup
```
| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email|
| `userId` | `string` | **Required**. unique userId|
| `email` | `string` | **Required**. email|
| `userType` | `string` | **Required**. userType|
| `password` | `string` | **Required**. password|
| `userStatus` | `string` | **Required**. userStatus|

#### Example
```
    {
        "name":"user_name",
        "userId":"admin",   
        "email":"mail@gmail.com",
        "userType":"ADMIN",
        "password":"admin@admin",
    }
```
