export const createUserPayload = {
    name: 'John Doe',
    email: "john@gmail.com",
    password: "Password@123",
}

export const mockUserData = {
    "_id": {
        "$oid": "630b243db4b9dc4cd9fd2cdb"
    },
    "name": "Akalanka",
    "email": "akalankaperera128@gmail.com",
    "password": "$2b$10$l3Gt77dMdril8RnRc2WWs.C6ZyTokwYzv2Y5/IXHZbxBlJH2jz3Ca",
    "verification_code": "6fd80438-ab78-449a-8f5a-fb8ddf279562",
    "is_verified": true,
    "is_active": true,
    "role": "ADMIN",
    "fcm_tokens": [],
    "created_at": {
        "$date": {
            "$numberLong": "1661674557202"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1661674683754"
        }
    }
}