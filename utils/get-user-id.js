import { supabase } from "./supa"


export const getUserId = async () => {
    const {data, error} = await supabase.auth.getSession()
    
    // jika terjadi error atau session tidak ada maka return null
    if (error || !data.session) return null

    // return userID berdasarkan session
    return data.session.user.id
}