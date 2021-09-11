import * as bcrypt from 'bcrypt'

const salt = 10

export const hashPw = async (pw:string): Promise<string> => {
    const hashedPw: string = await bcrypt.hash(pw, salt)
    return hashedPw
}