const BooksData = {
    titles:  [
        "To Kill a Mockingbird",
        "1984",
        "The Great Gatsby",
        "The Catcher in the Rye",
        "Pride and Prejudice"
    ],
      
    authors: [
        "Harper Lee",
        "George Orwell",
        "F. Scott Fitzgerald",
        "J.D. Salinger",
        "Jane Austen"
    ],
      
    publicationDates: [
        "1960-07-11",
        "1949-06-08",
        "1925-04-10",
        "1951-07-16",
        "1813-01-28"
    ],
      
    prices: [
        10.99,
        8.99,
        12.99,
        9.99,
        11.99
    ],
      
    genres: [
        "Fiction",
        "Dystopian",
        "Classic",
        "Literary Fiction",
        "Romance"
    ],
      
    stocks: [
        24,
        17,
        8,
        15,
        20
    ]
      
};

const AdminsData = {
    names: [
        "Socrates",
        "Plato",
        "Aristotle",
        "Epicurus",
        "Pythagoras"
    ],
  
    mails: [
        "socrates@wisdom.com",
        "plato@forms.com",
        "aristotle@logic.com",
        "epicurus@pleasure.com",
        "pythagoras@numbers.com"
    ],

    passwords: [
        "wisdom123",
        "forms123",
        "logic123",
        "pleasure123",
        "numbers123"
    ],
  
    phoneNumbers: [
        "+30 210 1234567",
        "+30 210 2345678",
        "+30 210 3456789",
        "+30 210 4567890",
        "+30 210 5678901"
    ]
};

const CustomersData = {
    names: [
        "Al Capone",
        "John Dillinger",
        "Jesse James",
        "Bonnie Parker",
        "Clyde Barrow"
    ],
      
    mails: [
        "al.capone@mail.com",
        "john.dillinger@mail.com",
        "jesse.james@mail.com",
        "bonnie.parker@mail.com",
        "clyde.barrow@mail.com"
    ],
     
    passwords: [
        "capone123",
        "dillinger123",
        "james123",
        "parker123",
        "barrow123"
    ],

    phoneNumbers: [
        "+1 312 5551234", 
        "+1 317 5555678", 
        "+1 816 5559012",
        "+1 214 5553456", 
        "+1 214 5557890"  
    ],
      
    addresses: [
        "1234 South Wabash Avenue, Chicago, IL",
        "5678 North Broadway Street, Indianapolis, IN",
        "9101 North 6th Street, St. Joseph, MO",
        "2345 Elm Street, Dallas, TX",
        "6789 Maple Avenue, Dallas, TX"
    ]
};

const ItemsData = {
    quantities: [1, 3, 1, 1, 1, 2, 1, 1, 1, 1],
    book_id: [1, 2, 1, 3, 1, 2, 1, 4, 3, 5],
    order_id: [1, 2, 2, 3, 3, 4, 5, 5, 5, 5]
};

module.exports = {
    AdminsData, 
    BooksData,
    CustomersData,
    ItemsData
};


