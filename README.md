# qla.dev

## Run locally

1. Install Node.js and run `npm install`.
2. Copy `.env.example` to `.env` and add the MySQL and admin credentials.
3. Build and run the complete site:

   ```bash
   npm run build
   npm start
   ```

The site runs at `http://localhost:3000`; the protected news editor is at
`http://localhost:3000/admin`. Express creates the `blog_posts` table on
startup if it does not exist. Uploaded images are stored in `uploads/`, so
that directory must use persistent storage in production.

For frontend development, run `npm run dev:server` and `npm run dev` in
separate terminals. Vite proxies API, upload, and admin requests to Express.
