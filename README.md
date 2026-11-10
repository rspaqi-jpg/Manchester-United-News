# United Red — Manchester United News

Independent Manchester United news blog. Stack: Next.js App Router, TypeScript, Tailwind CSS and Supabase.

## Setup
1. Create the Supabase table and RLS policies using `supabase/schema.sql`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel.
3. Create an Auth user in Supabase and set its `app_metadata.role` to `admin` using a trusted server-side admin workflow.
4. Add Adsterra snippets to the top/in-article ad components when approved.

Preview stories are included for design review and are not current news reporting.
