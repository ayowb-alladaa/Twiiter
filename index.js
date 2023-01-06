const tweetInput = document.getElementById("tweet");
const usernameInput = document.getElementById("username");
const addTweetBtn = document.getElementById("add-tweet");
const allTweetsContainer = document.getElementById("all-tweets-container");
let tweetsArray = [];

const createTweet = (tweetContent, username) => {
  tweetsArray.unshift({
    tweet: typeof tweetContent === "string" ? tweetContent : tweetInput.value,
    author: username || usernameInput.value,
    Like: false,
  });
  localStorage.setItem("tweets", JSON.stringify(tweetsArray));
  displayAllViews();
  tweetInput.value = "";
  usernameInput.value = "";
};

const likeTweet = (e) => {
  const [tweetView, usernameView] = e.target.parentElement.children;
  const targetTweetContent = tweetView.textContent;
  const targetUsername = usernameView.textContent;

  const [likedTweet] = tweetsArray.filter(
    (tweet) =>
      tweet.tweet === targetTweetContent && tweet.author === targetUsername
  );

  likedTweet.like = true;

  const { parentElement } = e.target; // Destructure
  // const parentElement = e.target.parentElement;
  localStorage.setItem("tweets", JSON.stringify(tweetsArray));
  parentElement.className = "likeTweet";
};

const reTweet = (e) => {
  const [tweet, username] = e.target.parentElement.children;
  createTweet(tweet.textContent, username.textContent);
  
};

const handleDom = ({ tweet, author, like }) => {
  // Create elements
  const singleTweetBox = document.createElement("div");
  const tweetParagraph = document.createElement("p");
  const UsernameParagraph = document.createElement("p");
  const LikeBtn = document.createElement("button");
  const reTweetBtn = document.createElement("button");

  LikeBtn.classList.add("style");
  reTweetBtn.classList.add("style");
  singleTweetBox.className = like ? "likeTweet" : "";
  singleTweetBox.classList.add("border");
  // Add data to views
  tweetParagraph.textContent = tweet;
  UsernameParagraph.textContent = author;

  UsernameParagraph.classList.add("gray");
  UsernameParagraph.classList.add("padding");
  tweetParagraph.classList.add("padding");

  LikeBtn.textContent = "Like";
  reTweetBtn.textContent = "ReTweet";

  // Add listeners to buttons
  LikeBtn.addEventListener("click", likeTweet);
  reTweetBtn.addEventListener("click", reTweet);

  // Append views to the container
  singleTweetBox.append(tweetParagraph, UsernameParagraph, LikeBtn, reTweetBtn);
  allTweetsContainer.appendChild(singleTweetBox);
};

const displayAllViews = () => {
  const data = JSON.parse(localStorage.getItem("tweets"))

  if (data) tweetsArray = data;
  
  if (tweetsArray.length) {
    allTweetsContainer.textContent = "";
    tweetsArray.forEach((tweet) => handleDom(tweet));
  } else {
    allTweetsContainer.textContent = "No Tweets yet, Share your first Tweet";
  }
};

addTweetBtn.addEventListener("click", createTweet);

displayAllViews();
