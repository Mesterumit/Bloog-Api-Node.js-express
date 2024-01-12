const {genSalt,hash, compare} = require('bcryptjs')

const main = async()=>{
    const salt = await genSalt(12)

    const hashedPassword = await hash('Hello word', salt)
    console.log(hashedPassword)

    const isMatch = await compare('Hello word',hashedPassword)
    console.log(isMatch)
}
main()