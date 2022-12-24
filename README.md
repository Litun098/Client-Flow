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
| `name` | `string` | **Required**. Name|
| `userId` | `string` | **Required**. unique userId|
| `email` | `string` | **Required**. email|
| `userType` | `string` | **Required**. userType|
| `password` | `string` | **Required**. password|

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
