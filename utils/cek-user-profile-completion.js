import { getUserId } from "./get-user-id"
import { supabase } from "./supa"


export const cekProfileCompletion = async () => {
    // mendapatkan userID dari
    const userID = await getUserId()
    // melakukan pengecekan apakah user sudah melakukan proses profile completion
    const { data, error } = await supabase
    .from('profile_customer')
    .select('id')
    .eq('user_id', userID)
    .maybeSingle()

    // return false jika terjadi error atau tidak ada data profile
    if (error){
        console.log("Terjadi error saat melakukan pengecekan user profile ke backend", error)
        return
    }

    // return true artinya ini adalah user baru
    if (!data) {
        return true
    }

    // return false jika data.id tersedia artinya user bukan user baru
    if (data.id) {
        return false
    }
}