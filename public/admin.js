

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayBooks();
  });
  
  async function fetchAndDisplayBooks() {
    try {
     
      const response = await fetch('http://localhost:3001/listBooks');
      const books = await response.json();
  
      
      const bookListContainer = document.getElementById('bookList');
  
      books.forEach(book => {
        const bookContainer = document.createElement('div');
        const bookTitleElement = document.createElement('span');
        bookTitleElement.textContent = book.title;
  
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = book.quantity;
  
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
  
        
        submitButton.addEventListener('click', async () => {
          const updatedQuantity = quantityInput.value;
  
          
          const updateResponse = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: book.id,
              title: book.title,
              year: book.year,
              description: book.description,
              quantity: updatedQuantity,
              imageURL: book.imageURL,
            }),
          });
  
          const updatedBook = await updateResponse.json();
          console.log('Updated Book:', updatedBook);
        });
  
        
        bookContainer.appendChild(bookTitleElement);
        bookContainer.appendChild(quantityInput);
        bookContainer.appendChild(submitButton);
        bookListContainer.appendChild(bookContainer);
      });
  
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  