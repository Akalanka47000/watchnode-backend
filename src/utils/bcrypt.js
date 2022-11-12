import bcrypt from 'bcrypt'

export const encrypt = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

export const compare = async (password, hash) => {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}
