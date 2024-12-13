//API Required Info
const gBooksKey = "AIzaSyA5MX7bf3T8Si3mUPkxSo14wp4Gjx4XIXA";
const gBooksBaseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const dictionaryBaseUrl = "https://api.datamuse.com/words?rel_syn=";

//PAGE ELEMENTS
const moodInput = document.getElementById("moodInput");
const submit = document.getElementById("submit");
const errorMessage = document.getElementById("errorMessage");
const loader = document.getElementById("loading");
const newBookButton = document.getElementById("newBookButton")
const newSearchButton = document.getElementById("newSearchButton");
const bookRecommendationField = document.querySelector(".bookRecommendation");
const textField = document.getElementById("bookInfo")
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookCover = document.getElementById("bookCover");





//SYNONYM FUNCTION
async function getMoodSynonym(selectedMood) {
    const mood = selectedMood.value;
    const endpoint = `${dictionaryBaseUrl}${mood}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

//BUILD SEARCH QUERY

async function buildSearchQuery(mood, synonyms) {
    let searchQuery = [mood.value]
    let synonymsList = await synonyms;
    for (let i = 0; i < 5; i++) {
        searchQuery.push(synonymsList[i].word)
    }
    console.log(searchQuery);
    return searchQuery
}

//GET BOOK RECOMMENDATION LIST

async function getBookRecommendation() {
    const searchQuery = await buildSearchQuery(moodInput, await getMoodSynonym(moodInput));
    console.log(searchQuery);
    const bookList = [];
    displayLoading()

    for (let i = 0; i < searchQuery.length; i++) {
        let word = searchQuery[i];
        const endpoint = `${gBooksBaseUrl}${word}+subject:fiction&key=${gBooksKey}`;

        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
               
                for (let j = 0; j < 3; j++) {
                    let book = {};
                    book.title = data.items[j].volumeInfo.title;
                    book.author = data.items[j].volumeInfo.authors;
                    book.coverImage = data.items[j].volumeInfo.imageLinks.thumbnail;
                    bookList.push(book);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    hideLoading()
    console.log(bookList)
    return bookList;
}


let bookRecList = undefined;

//DISPLAY BOOK RECOMMENDATION & SEARCH BAR

async function displayBookRecommendation() {
    const bookRecommendationList = await bookRecList;
    const randomListId = Math.floor(Math.random() * bookRecommendationList.length);
    bookCover.setAttribute("src", bookRecommendationList[randomListId].coverImage || "https://placecats.com/g/200/300");
    bookTitle.innerHTML = bookRecommendationList[randomListId].title || "No title available";
    bookAuthor.innerHTML = bookRecommendationList[randomListId].author || "No Author available";
    newBookButton.style.display = "block";
    newSearchButton.style.display = "block";
}

async function clearRecommendation() {
    bookCover.setAttribute("src","");
    bookTitle.innerHTML = "";
    bookAuthor.innerHTML = "";
    newBookButton.style.display = "";
    newSearchButton.style.display = "";
}

//PREDEFINED MOOD CHECK

const predefinedMoods = [
    "happy", "sad", "excited", "calm", "romantic", "adventurous", "angry", 
    "hopeful", "nostalgic", "curious", "motivated", "relaxed", "anxious", 
    "lonely", "content", "cheerful", "melancholy", "grateful", "fearful", 
    "playful", "energetic", "bored", "inspired", "confident", "sentimental",
    "joyful", "pensive", "giddy", "wistful", "optimistic", "moody", "tranquil", 
    "mysterious", "heartbroken", "flirty", "festive", "proud", "restless", 
    "imaginative", "cozy", "thoughtful", "determined", "in love", "love"
];

//VALIDATE MOOD
function isValidMood(mood) {
    const userMood = mood.toLowerCase().trim();
    return predefinedMoods.includes(userMood);
}

//DISPLAY-HIDE ERROR
function showError(message) {
    errorMessage.innerHTML = message;
    errorMessage.style.display = "block";
}

function hideError() {
    errorMessage.style.display = "none";
}

//DISPLAY-HIDE LOADING

function displayLoading() {
    loader.classList.add("display");
}

function hideLoading() {
    loader.classList.remove("display");
}


//EVENT LISTENER
submit.addEventListener("click", async () => {
    const userMood = moodInput.value;
    if (!isValidMood(userMood)) {
        showError("Please input a valid mood from the list: " + predefinedMoods.join(", "))
        return
    }
    hideError();

    bookRecList = await getBookRecommendation(); 
    await displayBookRecommendation(bookRecList);
    moodInput.style.display = "none";
    submit.style.display = "none";
});

newBookButton.addEventListener("click", () => displayBookRecommendation());

newSearchButton.addEventListener("click", async () => {
    moodInput.value = "";
    moodInput.style.display = "";
    submit.style.display = "";
    await clearRecommendation();
})
