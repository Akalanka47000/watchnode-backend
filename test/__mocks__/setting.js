export const createSettingPayload = {
    notification_enabled: true,
    notification_period: 60,
}

export const mockSettingData = {
    "_id": {
        "$oid": "635e900acd057501dfb8e9b0"
    },
    "user": {
        "$oid": "635e8fe0cd057501dfb8e99a"
    },
    "notification_enabled": true,
    "notification_period": 60,
    "created_at": {
        "$date": {
            "$numberLong": "1667141642966"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1667141642966"
        }
    }
}