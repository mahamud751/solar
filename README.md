# Green Dhaka Solar

The Next.js site and admin share a PostgreSQL database through Prisma. Public pages read published content from the database. Quote, consultation, partnership and rooftop estimate requests go to the admin inbox.

## Run locally

Use Node.js 24.11+ (LTS) and a running local PostgreSQL server.

```bash
npm ci
npm run db:local
npm run db:migrate
npm run db:seed
npm run admin:password -- admin@solar.local --generate
npm run dev
```

`db:local` uses the current PostgreSQL user through `psql` to create a dedicated `solar_website` database and login, then writes the connection string to the ignored `.env` file. Run it once if the database does not exist. To use another PostgreSQL database, copy `.env.example` to `.env` and set `DATABASE_URL` before running the migration and seed. Set `NEXT_PUBLIC_SITE_URL` when you have a public canonical domain.

Open the [website](http://localhost:3000) or [admin](http://localhost:3000/admin). Generated credentials are stored in the ignored `.local/admin-credentials.txt` file. To create another admin or reset a password, run the following in Bash or Zsh. A password reset ends that account’s current sessions.

```bash
read -rs solar_admin_password
printf '%s' "$solar_admin_password" | npm run admin:password -- admin@solar.local
unset solar_admin_password
```

## Admin

- Use **Services**, **Blog articles**, **FAQs**, **Testimonials**, **Project showcase**, **Equipment brands**, **Electricity utilities**, and **Cities and districts** to add entries, set their order, publish or unpublish them, and delete them. Slugs stay fixed after creation so existing URLs remain stable.
- Use **Page sections**, **English and Bangla text**, **Page SEO**, and **Company settings** to edit existing pages and the shared company information. The calculator rates and pricing assumptions are editable under **Electricity utilities** and **Page sections**.
- Use **Media library** to upload a JPEG, PNG or WebP image up to 4 MB. Copy its image path into a content field. The app stores uploaded images in PostgreSQL.
- Use **Inquiries** to search requests, filter by type or status, and record follow-up notes. Staff follow up from the inbox using the saved contact details.

The seed adds initial content and can be rerun. It preserves edits, drafts, and deletions. The default content includes the existing sample company phone and other marketing details, which can be updated in the admin.

Run `npm run build` and `npm start` for a production-mode local check. Keep `DATABASE_URL` available to the runtime and apply migrations before starting. For HTTPS behind a reverse proxy, configure it to forward the scheme or set `ADMIN_SECURE_COOKIES=true`.
