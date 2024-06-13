# Learn The Agent 

list of available endpoints:

- `POST /register`
- `POST /Login`
- `GET /agents`
- `POST /agents`
- `PUT /agents/:id`
- `DELETE /agents/:id`


&nbsp;

## 1. POST /register

Description:

- Register user

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Full name is required!"
}
OR
{
  "message": "Invalid email format!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password minimum length is 5 characters!"
}

```

&nbsp;

## 2. POST /login

Description:

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "<token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
```

&nbsp;

## 3. GET /agents

Description:

- Fetch all agents in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "agentName": "Gekko",
        "nickName": "Aggrobot",
        "description": "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
        "imgUrl": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
        "agentRole": "Initiator",
        "agentDescription": "Initiators challenge angles by setting up their team to enter contested ground and push defenders away.",
        "abilities": [
            {
                "abilityName": "Wingman",
                "abilityDescription": "EQUIP Wingman. FIRE to send Wingman forward seeking enemies. Wingman unleashes a concussive blast toward the first enemy he sees. ALT FIRE when targeting a Spike site or planted Spike to have Wingman defuse or plant the Spike. To plant, Gekko must have the Spike in his inventory. When Wingman expires he reverts into a dormant globule. INTERACT to reclaim the globule and gain another Wingman charge after a short cooldown.",
                "createdAt": "2024-06-11T19:55:13.838Z",
                "updatedAt": "2024-06-11T19:55:13.838Z"
            },
            {
                "abilityName": "Dizzy",
                "abilityDescription": "EQUIP Dizzy. FIRE to send Dizzy soaring forward through the air. Dizzy charges then unleashes plasma blasts at enemies in line of sight. Enemies hit by her plasma are Blinded. When Dizzy expires she reverts into a dormant globule. INTERACT to reclaim the globule and gain another Dizzy charge after a short cooldown.",
            },
            {
                "abilityName": "Mosh Pit",
                "abilityDescription": "EQUIP Mosh. FIRE to throw Mosh like a grenade. ALT FIRE to lob. Upon landing Mosh duplicates across a large area that deals a small amount of damage over time then after a short delay explodes.",
            },
            {
                "abilityName": "Thrash",
                "abilityDescription": "EQUIP Thrash. FIRE to link with Thrash’s mind and steer her through enemy territory. ACTIVATE to lunge forward and explode, Detaining any players in a small radius. When Thrash expires she reverts into a dormant globule. INTERACT to reclaim the globule and gain another Thrash charge after a short cooldown. Thrash can be reclaimed once.",
            }
        ],
    },
]
```

&nbsp;

## 4. POST /agents/

Description:

- add agents list.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- body:

```json
{
  "agentName": "String",
  "nickName": "String",
  "description": "String",
  "imgUrl": "String",
  "agentRole": "String",
  "agentDescription": "String",
  "abilities": "String"
}
```

_Response (201 - Created)_

```json
{
  "agentName": "String",
  "nickName": "String",
  "description": "String",
  "imgUrl": "String",
  "agentRole": "String",
  "agentDescription": "String",
  "abilities": "String"
}
```
&nbsp;

## 5. PUT /agents/:id

Description:

- Updated Agent


Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "Integer"
}
```

- body:

```json
{
  "agentName": "String",
  "nickName": "String",
  "description": "String",
  "imgUrl": "String",
  "agentRole": "String",
  "agentDescription": "String",
  "abilities": "String",
}
```

_Response (200 - OK)_

````json
{
    "message": "Sukses MengUpdate data",
    "data": {
        "id": 1,
        "agentName": "GekkoEdit",
        "nickName": "aggroBot Edit",
        "description": "Punya Edit",
        "imgUrl": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
        "agentRole": "Menyusahkan",
        "agentDescription": "all around you",
        "abilities": [
            {
                "abilityName": "Wingman",
                "abilityDescription": "EQUIP Wingman. FIRE to send Wingman forward seeking enemies. Wingman unleashes a concussive blast toward the first enemy he sees. ALT FIRE when targeting a Spike site or planted Spike to have Wingman defuse or plant the Spike. To plant, Gekko must have the Spike in his inventory. When Wingman expires he reverts into a dormant globule. INTERACT to reclaim the globule and gain another Wingman charge after a short cooldown.",
                "createdAt": "2024-06-11T19:55:13.838Z",
                "updatedAt": "2024-06-11T19:55:13.838Z"
            },
            {
                "abilityName": "Dizzy",
                "abilityDescription": "EQUIP Dizzy. FIRE to send Dizzy soaring forward through the air. Dizzy charges then unleashes plasma blasts at enemies in line of sight. Enemies hit by her plasma are Blinded. When Dizzy expires she reverts into a dormant globule. INTERACT to reclaim the globule and gain another Dizzy charge after a short cooldown.",
                "createdAt": "2024-06-11T19:55:13.838Z",
                "updatedAt": "2024-06-11T19:55:13.838Z"
            },
            {
                "abilityName": "Mosh Pit",
                "abilityDescription": "EQUIP Mosh. FIRE to throw Mosh like a grenade. ALT FIRE to lob. Upon landing Mosh duplicates across a large area that deals a small amount of damage over time then after a short delay explodes.",
                "createdAt": "2024-06-11T19:55:13.838Z",
                "updatedAt": "2024-06-11T19:55:13.838Z"
            },
            {
                "abilityName": "Thrash",
                "abilityDescription": "EQUIP Thrash. FIRE to link with Thrash’s mind and steer her through enemy territory. ACTIVATE to lunge forward and explode, Detaining any players in a small radius. When Thrash expires she reverts into a dormant globule. INTERACT to reclaim the globule and gain another Thrash charge after a short cooldown. Thrash can be reclaimed once.",
                "createdAt": "2024-06-11T19:55:13.838Z",
                "updatedAt": "2024-06-11T19:55:13.838Z"
            }
        ]
    }
}

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
````

&nbsp;

## 6. DELETE /agents/:id

Description:

- Delete Agent by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Sukses Delete Data id"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
