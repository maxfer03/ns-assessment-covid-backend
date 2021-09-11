import * as bcrypt from 'bcrypt'

const salt = 10

export const hashPw = async (pw:string): Promise<string> => {
    const hashedPw: string = await bcrypt.hash(pw, salt)
    return hashedPw
}

export const validatePw = async (pw:string, hashedPw: string): Promise<boolean> => {
    const validate = await bcrypt.compare(pw, hashedPw,)
    console.log('Valid pw?', validate)
    return validate
}