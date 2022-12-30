    let googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes?q=ugly+love&maxResults=20'
    let searchResults = []
    
    function createGroup(){
        const div = document.createElement('div')
        const img = document.createElement('img')
        const h3 = document.createElement('h3')
        const bookGroup = document.querySelector('.book-group')

        bookGroup.appendChild(div)
        div.appendChild(img)
        div.appendChild(h3)

        div.classList.add('single-book')
        img.classList.add('book-cover')
        h3.classList.add('book-title')
    }

    fetch(googleBooksUrl)
        .then(res => res.json())
        .then(data => {
            
            for(let i = 0; i < data.items.length; i++){
                console.log(data.items[i].volumeInfo.title)

                if(data.items[i].volumeInfo.imageLinks && !data.items[i].volumeInfo.title.toLowerCase().includes('summary') && !data.items[i].volumeInfo.title.toLowerCase().includes('ebook')) searchResults.push(data.items[i])

                // searchResults.push(data.items[i])

            }

            console.log(data)
            // console.log(data.items.volumeInfo.title)

            for(let i = 0; i < searchResults.length; i++){
                createGroup()
            }

            console.log(searchResults)

            let bookDivs = Array.from(document.querySelectorAll('.single-book'))

            for(let i = 0; i < bookDivs.length; i++){

                // if(!searchResults[i].volumeInfo.imageLinks.thumbnail) searchResults.splice(searchResults[i], 1)

                bookDivs[i].querySelector('img').src = searchResults[i].volumeInfo.imageLinks.thumbnail
                bookDivs[i].querySelector('h3').innerText = searchResults[i].volumeInfo.title
            }

        })



    // for(let i = 0; i < )




