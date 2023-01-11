# notification for CRM App

#### install required packages

```
    npm i
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