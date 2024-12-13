//API Required Info
const gBooksKey = "AIzaSyA5MX7bf3T8Si3mUPkxSo14wp4Gjx4XIXA";
const gBooksBaseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const dictionaryBaseUrl = "https://api.datamuse.com/words?rel_syn=";

//Page Elements
const moodInput = document.getElementById("moodInput");
const submit = document.getElementById("submit");
const newBookButton = document.getElementById("newBookButton")
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

    for (let i = 0; i < searchQuery.length; i++) {
        let word = searchQuery[i];
        const endpoint = `${gBooksBaseUrl}${word}+&key=${gBooksKey}`;

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
    console.log(bookList)
    return bookList;
}


let bookRecList = undefined;

async function displayBookRecommendation() {
    const bookRecommendationList = await bookRecList;
    const randomListId = Math.floor(Math.random() * bookRecommendationList.length);
    bookCover.setAttribute("src", bookRecommendationList[randomListId].coverImage);
    bookTitle.innerHTML = bookRecommendationList[randomListId].title || "No title available";
    bookAuthor.innerHTML = bookRecommendationList[randomListId].author || "No Author available";
    newBookButton.style.display = "block";
}

/* //Response Render Function
async function renderResponse(response) {
    if (!response.length) {
        textField.innerHTML = "<p>Try again!</p><p>There were no suggestions found.</p>"
        return
    }
    
    let wordList = [];

} */

//EVENT LISTENER
submit.addEventListener("click", async () => {bookRecList = await getBookRecommendation(); await displayBookRecommendation(bookRecList)})
newBookButton.addEventListener("click", () => displayBookRecommendation() )