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
    POST localhost:3000/crm/api/auth/signup
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

#### NOTE : You can login only if the user status is approved.

#### Signin User

``` http
    POST localhost:3000//crm/api/auth/signin
```
| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. unique userId|
| `password` | `string` | **Required**. password|

#### Example
```
    {
        "userId":"admin",   
        "password":"admin@admin",
    }
```
#### Output

```
    {
        "name": "user_name",
        "userId": "admin",
        "email": "mail@gmail.com",
        "userTypess": "ENGINEER",
        "userStatus": "APPROVED",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                        .eyJ1c2VySWQiOiJhZG1pbiIsImlhdCI6MTY3MTg4MjUzNCwiZXhwIjoxNjcxOTY4OTM0fQ
                        .EVfZybdHFCQQN8NaIyCMK-G8UcES2Ry2gRr5MwhEkyI"
    }
```