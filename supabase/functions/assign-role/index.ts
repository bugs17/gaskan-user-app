// supabase/functions/assign-role/index.js

import { Database } from '@database';
import { createClient } from "@supabase/supabase-js";

// Supabase admin client pakai service role key
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const supabaseAdmin = createClient<Database>(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string);

Deno.serve(async function(req) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // Ambil JWT dari Authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader.indexOf("Bearer ") !== 0) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = authHeader.replace("Bearer ", "");

  // Ambil user dari token
  const result = await supabaseAdmin.auth.getUser(token);
  if (result.error) {
    return new Response(
      JSON.stringify({ error: "Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const user_id = result.data.user.id;

  // Ambil body JSON
  let body;
  try {
    body = await req.json();
  } catch (_e) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const role = body.role;
  if (!role) {
    return new Response(
      JSON.stringify({ error: "role is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validasi role
  const validRoles = ["customer", "warung", "driver"];
  if (validRoles.indexOf(role) === -1) {
    return new Response(
      JSON.stringify({ error: "Invalid role" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Insert / update role di tabel user_roles
  const dbResult = await supabaseAdmin
    .from("user_roles")
    .upsert({
      role:role,
      user_id:user_id
    }
  )

  if (dbResult.error) {
    return new Response(
      JSON.stringify({ error: "Failed to assign role" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Role assigned successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
