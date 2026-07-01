# IDpedia Professional Web App

ഈ package-ൽ frontend + backend രണ്ടും ഉണ്ട്. പഴയ page-ലെ IDpedia title, Smart Data Management System, Official/Organization login, organization registration, student registration, photo upload, records list, edit/delete, Kuttiady, Perambra, Vadakara, email, phone എന്നിവ സൂക്ഷിച്ചിട്ടുണ്ട്.

## Local backend

1. backend folder തുറക്കുക.
2. npm install run ചെയ്യുക.
3. .env.example copy ചെയ്ത് .env എന്ന് rename ചെയ്യുക.
4. MONGO_URI, JWT_SECRET, ADMIN_USER, ADMIN_PASSWORD, CLIENT_URL values ചേർക്കുക.
5. sample data വേണമെങ്കിൽ npm run seed.
6. npm run dev run ചെയ്യുക. Backend URL: http://localhost:5000

## Local frontend

1. frontend/app.js തുറക്കുക.
2. API_BASE_URL = http://localhost:5000/api ആക്കി മാറ്റുക.
3. frontend/index.html browser-ൽ തുറക്കുക.

Default login: Official admin / 1234. Seed ചെയ്താൽ Organization school / school123.

## MongoDB Atlas

MongoDB Atlas account create ചെയ്യുക, free cluster ഉണ്ടാക്കുക, database user create ചെയ്യുക, Network Access-ൽ 0.0.0.0/0 add ചെയ്യുക, Node.js connection string copy ചെയ്ത് MONGO_URI ആയി ഉപയോഗിക്കുക.

## GitHub

GitHub-ൽ repository create ചെയ്ത് ഈ idpedia-pro folder upload ചെയ്യുക. frontend and backend folders repository-ൽ കാണണം.

## Render backend deploy

Render > New > Web Service. GitHub repo connect ചെയ്യുക. Root Directory: backend. Build Command: npm install. Start Command: npm start. Environment variables: MONGO_URI, JWT_SECRET, ADMIN_USER, ADMIN_PASSWORD, CLIENT_URL. Deploy ചെയ്താൽ Render URL കിട്ടും.

## Netlify frontend deploy

frontend/app.js-ൽ API_BASE_URL Render URL + /api ആയി മാറ്റുക. Netlify > Add new site > Deploy manually. frontend folder drag and drop ചെയ്യുക. Netlify URL കിട്ടിയ ശേഷം Render CLIENT_URL അതേ URL ആക്കുക.

## Note

Render free service-ൽ uploaded photos /uploads folder-ൽ save ചെയ്യും. Service restart ആയാൽ files നഷ്ടപ്പെടാം. Production-ൽ Cloudinary അല്ലെങ്കിൽ S3 ഉപയോഗിക്കുന്നത് നല്ലതാണ്.