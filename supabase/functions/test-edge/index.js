


Deno.serve(async function(req){
  console.log("Test edge di jalankan...")
  console.log(req)

  let message = "Hallo from edge function bugs write this"
  return new Response(
    JSON.stringify({message: message}),
    { headers: { "Content-Type": "application/json" } },
  )
})