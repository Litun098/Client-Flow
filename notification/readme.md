# Notification for CRM App

#### install required packages

```
    npm i
```
Create a .env file and define MAIL_PORT, EMAIL_USER, EMAIL_PASS for ticketNotification.js and database name and url for db.config.js

For Example 
```

    MAIL_PORT = "455" 
    EMAIL_USER = "crm.notification@gmail.com"
    EMAIL_PASS = "email_password"
    DATABASE = "notification_db"
    DATABASE_URL = "mongodb://localhost:27017/notification_db"
```

## API Endpoints

#### Create ticket notification

``` http
    POST localhost:3030/notifyServer/api/notifications/
```
| body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Subject`    | `string` | **Required**. Notification subject         |
| `content`  | `string` | **Required**. notification content|
| `recipientEmail`   | `string` | **Required**. recipient email/emails        |
| `requester`| `string` | **Required**. requester     |
| `ticketId`| `string` | **Required**. ticketId   |

#### Example Input
```
    {
        "subject":"Ticket updated by Engineer",
        "content":"Your ticket has been updated",
        "recipientEmail":["nayaklitun9@gmail.com","litunnayak09@hotmail.com"],
        "requester":"Litun",
        "ticketId":"63b5babf0e3bf0ba61c233a7"
    }
```

#### Output

```
    {
        "requestId": "63be41fae9fd4710dfb4ed78",
        "status": "Accepted Request"
    }
```
#### Get notification by Id

``` http
    POST localhost:3030/notifyServer/api/notifications/:id
```
| path params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Notification subject|

#### Example Input
```
    GET localhost:3030/notifyServer/api/notifications/63b5babf0e3bf0ba61c233a7
```

#### Output

```
    {
        "requestId": "63b5babf0e3bf0ba61c233a7",
        "subject": "Ticket updated by Engineer",
        "content": "Your ticket has been updated",
        "recipientEmail": [
            "nayaklitun9@gmail.com",
            "litunnayak09@hotmail.com"
        ],
        "sentStatus": "UN_SENT"
    }
```


## Contributors

- [Dibyakanta Nayak](https://github.com/Litun098/)

