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
| body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. Name         |
| `userId`  | `string` | **Required**. unique userId|
| `email`   | `string` | **Required**. email        |
| `userType`| `string` | **Required**. userType     |
| `password`| `string` | **Required**. password     |

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

**_NOTE:_** : You can login only if the user status is approved.

#### Signin User

``` http
    POST localhost:3000/crm/api/auth/signin
```
| body       | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `userId`   | `string` | **Required**. unique userId|
| `password` | `string` | **Required**. password     |

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


#### Get all users

**_NOTE:_**  user should be ADMIN.

``` http
    POST localhost:3000/crm/api/users
```
| header            | Type     | Description                |
| :-----------------| :------- | :------------------------- |
| `x-access-token`  | `string` | **Required**. token        |

#### Output

```
    [
        {
            "name": "Litun",
            "userId": "admin",
            "email": "nayaklitun9@gmail.com",
            "userTypes": "ENGINEER",
            "userStatus": "APPROVED"
        },
        {
            "name": "Litun Nayak",
            "userId": "litun123",
            "email": "litunnayak09@gmail.com",
            "userTypes": "ADMIN",
            "userStatus": "APPROVED"
        },
        {
            "name": "Litun Nayak",
            "userId": "litun1231",
            "email": "litunnayak9@gmail.com",
            "userTypes": "CUSTOMER",
            "userStatus": "APPROVED"
        }
    ]
```

#### Get user by userId


**_NOTE:_**  user should be ADMIN.

``` http
    POST localhost:3000/crm/api/users/:userId
```
| header            | Type     | Description                |
| :-----------------| :------- | :------------------------- |
| `x-access-token`  | `string` | **Required**. token        |

#### Example 
```http
   GET localhost:3000/crm/api/users/admin
```

#### Output

```
    {
        "_id": "63a6e6cd4851254b90ea931c",
        "name": "Litun",
        "userId": "admin",
        "password": "$2b$10$oYimYk0DBzDw/vy0Y28Rdu1fy0M4Z0pjaiyCgzcES9IBTuqW1PhX.",
        "email": "nayaklitun9@gmail.com",
        "userTypes": "ENGINEER",
        "userStatus": "APPROVED",
        "createdAt": "2022-12-24T11:47:25.784Z",
        "updatedAt": "2022-12-24T11:47:25.784Z",
        "__v": 0
    }
```

#### Get user by userId and update userStatus


**_NOTE:_**  user should be ADMIN.

``` http
    PUT localhost:3000/crm/api/users/:userId
```
| header            | Type     | Description                |
| :-----------------| :------- | :------------------------- |
| `x-access-token`  | `string` | **Required**. token        |

| body           | Type     | Description                    |
| :------------  | :------- | :-------------------------     |
| `userStatus`   | `string` | **Required**. update userStatus|

#### Example 
```http
   PUT localhost:3000/crm/api/users/admin
```

```
    {
    "userStatus":"APPROVED"
    }
```

#### Output

```
    {
        "message": "User record has been updated successfully."
    }
```

#### Create ticket

``` http
    POST localhost:3000/crm/api/ticket/
```
| header            | Type     | Description                |
| :-----------------| :------- | :------------------------- |
| `x-access-token`  | `string` | **Required**. token        |


| body              | Type     | Description                        |
| :-----------------| :------- | :----------------------------------|
| `title`           | `string` | **Required**. title of the ticket  |
| `ticketPriority`  | `string` |  Priority of the ticket            |
| `description`     | `string` |  Description                       |
| `status`          | `string` | Status open or closed              |

#### Example

```
    {
        "title":"The first ticket",
        "ticketPriority":2,
        "description":"Random description for random ticket",
        "status": "OPEN"
    }
```

#### Output

```
    {
        "ticket": "The first ticket",
        "ticketPriority": "2",
        "description": "Random description for random ticket",
        "status": "OPEN",
        "reporter": "dibya123",
        "assignee": "litun12345",
        "id": "63b5babf0e3bf0ba61c233a7",
        "createdAt": "2023-01-04T17:43:27.495Z",
        "updatedAt": "2023-01-04T17:43:27.495Z"
    }
```

#### Update ticket

``` http
    PUT localhost:3000/crm/api/ticket/:id
```
| header            | Type     | Description                |
| :-----------------| :------- | :------------------------- |
| `x-access-token`  | `string` | **Required**. token        |

| params            | Type     | Description                                |
| :-----------------| :------- | :------------------------------------------|
| `id`              | `string` | **Required**.Id of the ticked to be updated|


| body              | Type     | Description                                |
| :-----------------| :------- | :------------------------------------------|
| `title`           | `string` |  title of the ticket to be updated         |
| `ticketPriority`  | `string` |  Priority of the ticket to be updated      |
| `description`     | `string` |  Description to be updated                 |
| `status`          | `string` |  Status open or closed to be updated       |


#### Example

``` http
    PUT localhost:3000/crm/api/ticket/63b5babf0e3bf0ba61c233a7
```

```
    {
        "title":"The first ticket updated"
    }
```

#### Output

```
    {
        "ticket": "The first ticket updated",
        "ticketPriority": "2",
        "description": "Random description for random ticket",
        "status": "OPEN",
        "reporter": "dibya123",
        "assignee": "litun12345",
        "id": "63b5babf0e3bf0ba61c233a7",
        "createdAt": "2023-01-04T17:43:27.495Z",
        "updatedAt": "2023-01-04T17:43:27.495Z"
    }
```