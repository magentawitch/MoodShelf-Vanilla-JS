# 📚 MoodShelf (Vanilla JS Version)

MoodShelf is a web app that recommends books based on your mood. You type how you’re feeling, and it finds books that match that vibe using the Google Books API and the Datamuse API for mood-related keywords.

This is the original version of the app, built with **HTML, CSS, and plain JavaScript** — no frameworks.

---

## 🚀 How to Use

1. **Clone this repository** to your computer.
2. **Add your Google Books API key.** Open the main JavaScript file (app.js) and replace the placeholder with your own key:

```bash
const gBooksKey = "your_key";
```

3. **Open index.html in your browser.** No need to install dependencies or run a server — everything runs locally.

---

## 🔐 How to get a Google Books API key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the **Books API** for your project
4. Go to **Credentials → Create Credentials → API Key**
5. Copy the key and paste it into the app modal when prompted

👉 Need help? Follow this [official Google guide](https://developers.google.com/books/docs/v1/using#APIKey)

Your key is saved only in your local copy of the project and is never sent anywhere.

---

## 🆕 Newer Version Available (React)

Looking for a more polished experience? The new version of MoodShelf is built with React and includes LocalStorage-based API key storage.

👉 Check out the React version [here](https://github.com/magentawitch/MoodShelf-React)
