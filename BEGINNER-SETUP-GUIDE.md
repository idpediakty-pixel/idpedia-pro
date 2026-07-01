# IDpedia Beginner Setup Guide

ഈ guide ഒരു തുടക്കക്കാരനെ മുൻനിർത്തിയാണ് എഴുതിയത്. ഓരോ step-ഉം പതുക്കെ ചെയ്യുക.

## A. നിങ്ങളുടെ computer-ൽ ആദ്യം വേണ്ടത്

1. Node.js install ചെയ്തിട്ടുണ്ടോ എന്ന് പരിശോധിക്കുക.
   - Start menu തുറന്ന് Command Prompt അല്ലെങ്കിൽ Terminal തുറക്കുക.
   - ഈ command type ചെയ്യുക:

npm -v

version number വന്നാൽ Node/npm ready ആണ്. error വന്നാൽ https://nodejs.org തുറന്ന് LTS version install ചെയ്യുക.

## B. Project folder എവിടെയാണ്?

C:\Users\roopa\Documents\Codex\2026-06-30\ith\outputs\idpedia-pro

ഇതിന്റെ ഉള്ളിൽ രണ്ട് പ്രധാന folders ഉണ്ട്: frontend, backend.

## C. npm install എങ്ങനെ run ചെയ്യാം?

1. ഈ backend folder തുറക്കുക:

C:\Users\roopa\Documents\Codex\2026-06-30\ith\outputs\idpedia-pro\backend

2. ആ folder-ൽ right click ചെയ്യുക.
3. Open in Terminal തിരഞ്ഞെടുക്കുക.
4. Terminal തുറന്നാൽ ഈ command type ചെയ്യുക:

npm install

5. Enter അമർത്തുക.
6. install കഴിഞ്ഞാൽ backend folder-ൽ node_modules folder, package-lock.json file വരും. ഇവ വന്നാൽ npm install success ആണ്.

## D. .env file ഉണ്ടാക്കുക

backend folder-ൽ .env.example file ഉണ്ട്.

1. അതിന്റെ copy എടുക്കുക.
2. copy file rename ചെയ്ത് .env ആക്കുക.
3. .env open ചെയ്ത് values മാറ്റുക.

Example:

PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/idpedia
JWT_SECRET=my-secret-key-123
ADMIN_USER=admin
ADMIN_PASSWORD=1234
CLIENT_URL=http://localhost:5500

MONGO_URI നിങ്ങളുടെ MongoDB Atlas connection string ആയിരിക്കണം.

## E. MongoDB Atlas easy steps

1. https://www.mongodb.com/atlas തുറക്കുക.
2. account create/login ചെയ്യുക.
3. Build a Database click ചെയ്യുക.
4. Free cluster select ചെയ്യുക.
5. Database user create ചെയ്യുക.
6. Network Access തുറക്കുക.
7. Add IP Address click ചെയ്യുക.
8. Allow access from anywhere select ചെയ്യുക. ഇത് സാധാരണ 0.0.0.0/0 ആണ്.
9. Database > Connect click ചെയ്യുക.
10. Drivers select ചെയ്യുക.
11. Node.js connection string copy ചെയ്യുക.
12. ആ string .env file-ലെ MONGO_URI ആയി paste ചെയ്യുക.
13. password ഭാഗത്ത് നിങ്ങളുടെ database password ഇടുക.

## F. Backend run ചെയ്യുക

backend folder terminal-ൽ ഈ command run ചെയ്യുക:

npm run dev

ഇങ്ങനെ വന്നാൽ backend running ആണ്:

IDpedia API running
MongoDB connected

Browser-ൽ ഇത് തുറന്ന് നോക്കാം:

http://localhost:5000

## G. Sample data add ചെയ്യുക

Backend running ആണെങ്കിൽ terminal-ൽ Ctrl + C അമർത്തി stop ചെയ്യുക. പിന്നെ run ചെയ്യുക:

npm run seed

Login details:

Official: admin / 1234
Organization: school / school123

## H. Frontend local ആയി open ചെയ്യുക

1. frontend folder തുറക്കുക.
2. app.js open ചെയ്യുക.
3. ആദ്യ line ഇങ്ങനെ മാറ്റുക:

const API_BASE_URL = "http://localhost:5000/api";

4. backend terminal-ൽ npm run dev running ആയിരിക്കണം.
5. frontend/index.html browser-ൽ open ചെയ്യുക.
6. login ചെയ്ത് test ചെയ്യുക.

## I. GitHub upload

1. GitHub.com തുറക്കുക.
2. New repository create ചെയ്യുക.
3. repository name: idpedia-pro
4. ഈ project folder upload ചെയ്യുക:

C:\Users\roopa\Documents\Codex\2026-06-30\ith\outputs\idpedia-pro

## J. Render backend deploy

1. Render.com login ചെയ്യുക.
2. New > Web Service click ചെയ്യുക.
3. GitHub repository select ചെയ്യുക.
4. Root Directory: backend
5. Build Command: npm install
6. Start Command: npm start
7. Environment Variables add ചെയ്യുക:

MONGO_URI = നിങ്ങളുടെ MongoDB Atlas URL
JWT_SECRET = strong-secret-anything
ADMIN_USER = admin
ADMIN_PASSWORD = 1234
CLIENT_URL = Netlify URL കിട്ടിയ ശേഷം ചേർക്കാം

8. Deploy click ചെയ്യുക.
9. Render URL copy ചെയ്യുക. Example:

https://idpedia-backend.onrender.com

## K. Netlify frontend deploy

1. frontend/app.js open ചെയ്യുക.
2. API_BASE_URL ഇങ്ങനെ മാറ്റുക:

const API_BASE_URL = "https://idpedia-backend.onrender.com/api";

നിങ്ങളുടെ real Render URL ഉപയോഗിക്കുക.

3. Netlify.com login ചെയ്യുക.
4. Add new site > Deploy manually.
5. frontend folder drag and drop ചെയ്യുക.
6. Netlify URL copy ചെയ്യുക.
7. Render dashboard തുറന്ന് CLIENT_URL environment variable ആ Netlify URL ആക്കി update ചെയ്യുക.
8. Render service redeploy ചെയ്യുക.

## L. Common errors

npm command not found: Node.js install ചെയ്തിട്ടില്ല. Node.js LTS install ചെയ്യുക.

MongoDB connected വരുന്നില്ല: MONGO_URI തെറ്റായിരിക്കാം. Password ശരിയാണോ, Network Access 0.0.0.0/0 ആണോ നോക്കുക.

Frontend login work ചെയ്യുന്നില്ല: frontend/app.js-ൽ API_BASE_URL ശരിയാണോ നോക്കുക.

CORS error: Render-ലെ CLIENT_URL Netlify URL ആണോ നോക്കുക.

Photo upload deploy കഴിഞ്ഞ് നഷ്ടപ്പെടുന്നു: Render free server restart ആകുമ്പോൾ local uploads നഷ്ടപ്പെടാം. Production-ൽ Cloudinary/S3 വേണം.
