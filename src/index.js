//Global variables
const theURL = "http://localhost:3000/films";
const ulContainer = document.querySelector("#films");
const posterImg = document.querySelector("#poster");
const title = document.querySelector("#title");
const runtime = document.querySelector("#runtime");
const description = document.querySelector("#film-info");
const showtime = document.querySelector("#showtime");
const availableTickets = document.querySelector("#ticket-num");
const btn = document.querySelector("#buy-ticket");

//Helper functions

//3. Buy a ticket for a movie - see the number of available tickets decreasing until 0 tickets available
const buyTicket = () => {
  const decreaseTicket = parseInt(availableTickets.textContent);

  if (decreaseTicket > 0) {
    availableTickets.textContent = decreaseTicket - 1;
  }
};

btn.addEventListener("click", buyTicket);

//1. Display details as well as subtracting the number of tickets_sold from the theater's capacity
const displayDetails = movie => {
  posterImg.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `${movie.runtime} minutes`;
  description.textContent = movie.description;
  showtime.textContent = movie.showtime;
  availableTickets.textContent = movie.capacity - movie.tickets_sold;
};

//2. Append movie
const appendMovie = movie => {
  const list = document.createElement("li");
  list.textContent = movie.title.toUpperCase();
  list.addEventListener("click", () => displayDetails(movie)); //Bonus(1) - Click any movie title to replace current movie's details
  ulContainer.append(list);
};

//1. See the first movie's details & GET request to the following endpoint to retrieve the film data
const fetchData = () => {
  fetch(theURL)
    .then(res => res.json())
    .then(movieArray => {
      ulContainer.innerHTML = ""; //Remove the placeholder list
      displayDetails(movieArray[0]); //FIRST MOVIE
      movieArray.forEach(appendMovie);
    });
};
fetchData();
