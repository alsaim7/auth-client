auth-client

Reusable JWT Authentication Client for React Apps.

This package allows you to write authentication logic once and reuse it across multiple React projects using the same backend and user database.


---

✅ Features

Shared JWT authentication logic

Axios instance with automatic token attachment

Optional API key support

Protected routes (RequireAuth)

Automatic logout on token expiry

Works with multiple React apps

Backend configuration per project



---

📥 Installation (In Any React Project)

Install directly from GitHub:

npm install https://github.com/alsaim7/auth-client.git


---

⚙️ Setup (Required Once Per Project)

You MUST initialize the API when the app starts.

Best place: main.jsx.

import { createAPI } from "auth-client";

createAPI({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  apiKey: import.meta.env.VITE_API_KEY, // optional
});

✅ Without API Key

createAPI({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});


---

🚀 Usage

1️⃣ Using API Requests

import { getAPI } from "auth-client";

const api = getAPI();

await api.get("/users");

JWT token is automatically attached.


---

2️⃣ Store Token After Login

import { setToken } from "auth-client";

setToken(response.data.access_token);


---

3️⃣ Get Current User

Decode the JWT token and return the user payload:

import { getUser } from "auth-client";

const user = getUser();
console.log(user); // { id, email, role, exp, ... }

Returns null if no token exists or if the token is invalid.

Useful for displaying user info, role-based UI, or passing user data to components.


---

4️⃣ Check Authentication Status

import { isAuthenticated } from "auth-client";

if (isAuthenticated()) {
  // user is logged in
}

Returns true if a token exists in localStorage, false otherwise.


---

5️⃣ Protected Routes

import { RequireAuth } from "auth-client";

<Route
  path="/dashboard"
  element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  }
/>


---

6️⃣ Auto Logout When Token Expires

Add once inside App.jsx:

import { SessionTimeoutWatcher } from "auth-client";

function App() {
  return (
    <>
      <SessionTimeoutWatcher />
      <Routes />
    </>
  );
}


---

🧠 How It Works

1. User logs in


2. Token saved in localStorage


3. Axios interceptor attaches token automatically


4. Protected routes check authentication


5. Token expiry logs user out automatically




---

⚠️ Important Rules

Always Call createAPI()

If you see error:

API not initialized

You forgot to call createAPI() during app startup.


---

Do NOT Import Axios Directly

Always use:

getAPI()

so token handling works correctly.


---

Login UI Is NOT Included

This package handles logic only.

Each project should create its own login page UI.


---

🔐 Environment Variables Example

.env

VITE_BACKEND_URL=http://localhost:8000
VITE_API_KEY=your_key_here

(API key optional.)


---

🛠 Updating auth-client

After making changes:

git add .
git commit -m "update"
git push

Then inside projects:

npm update auth-client


---

⚠️ npm audit Warnings

You may see warnings related to:

eslint
ajv
minimatch

These are development dependencies only.

✅ Safe to ignore.

They do NOT affect production or users.

Do NOT run:

npm audit fix --force

unless you know dependency impacts.


---

✅ Supported Versions

React >= 18

react-router-dom >= 6

Vite projects supported



---

📁 Package Structure

auth-client/
│
├── src/
│   ├── api.js
│   ├── auth.js
│   ├── RequireAuth.jsx
│   ├── SessionTimeoutWatcher.jsx
│   └── index.js
└── package.json


---

🎯 Goal

Create authentication once → reuse in unlimited React projects.


---

👨‍💻 Author

Al Saim Shakeel (@alsaim7)


---

✅ Done.