# User API Spec

## Register User API

Endpoint :  POST /api/users

Request Body :

```json
{
  "username" : "bgs",
  "password" : "usm jaya",
  "name" : "Bagus Setiawan"
}
```

Response Body Success :

```json
{
  "data" : {
    "username" : "bgs",
    "name" : "Bagus Setiawan"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username" : "bgs",
  "password" : "usm jaya"
}
```

Response Body Success :

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
  "name" : "Bagus Setiawan USM", // optional
  "password" : "new password" // optional
}
```

Response Body Success :

```json
{
  "data" : {
    "username" : "bgs",
    "name" : "Bagus Setiawan USM"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success:

```json
{
  "data" : {
    "username" : "bgs",
    "name" : "Bagus Setiawan"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```


# Crime API Spec

## Create Crime API

Endpoint : POST /api/crimes

Headers :
- Authorization : token

Request Body :

```json
{
  
  "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"

}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
  "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
  }
}
```

Response Body Error :

```json
{
  "errors" : "date is not valid format"
}
```

## Update Crime API

Endpoint : PUT /api/crimes/:id

Headers :
- Authorization : token

Request Body :

```json
{
   "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
     "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
  }
}
```

Response Body Error :

```json
{
  "errors" : "date is not valid format"
}
```

## Get Crime API

Endpoint : GET /api/crimes/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
  "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Crime is not found"
}
```

## Search Crime API

Endpoint : GET /api/crimes

Headers :
- Authorization : token

Query params :
- type_crime : Search by type_crime , using like, optional
- name_crime : Search by name_crime using like, optional
- location : Search by location using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id" : 1,
     "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
    },
    {
      "id" : 2,
       "type_crime": "Pencurian",
  "name_crime": "Pencurian Mobil",
  "location": "Jakarta Barat",
  "incident_date": "2022-07-12"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Crime API

Endpoint : DELETE /api/crimes/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Crime is not found"
}
```


# Accident API Spec

## Create Accident API

Endpoint : POST /api/accidents

Headers :
- Authorization : token

Request Body :

```json
{
  "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
  }
}
```

Response Body Error :

```json
{
  "errors" : "date is not valid format"
}
```

## Update Accident API

Endpoint : PUT /api/accidents/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
  }
}
```

Response Body Error :

```json
{
  "errors" : "date is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/accidents/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Accident is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query params :
- location : Search by location, using like, optional
- fatalities : Search by fatalities using like, optional
- injured : Search by injured using like, optional
- vehicle_type : Search by vehicle_type using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id" : 1,
    "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
    },
    {
      "id" : 2,
      "date": "2023-06-17",
  "location": "Way Kanan",
  "description": "Kecelakkan terjadi di kabupaten Way Kn",
  "fatalities": 3,
  "injured": 2,
  "vehicle_type": "motor"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Accident API

Endpoint : DELETE /api/accidents/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Accident is not found"
}
```

