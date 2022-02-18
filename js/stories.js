"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

$storyForm.submit(function(event) {
  event.preventDefault();

  const title = document.getElementById('story-title').value
  const url = document.getElementById('story-url').value
  const author = document.getElementById('story-author').value
  //const username = currentUser.username
  const storyData = {title, url, author};

  console.log(storyData)
  let newStory = storyList.addStory(currentUser,storyData)
  console.log(newStory)

  /*
    TODO: Stephanie you'll have to 
    xx 1) Read the 3 inputs from the story-form
      a) title 
      b) author
      c) url
    2) Call the addStoryList and pass in form inputs
      e.g.
        let newStory = await storyList.addStory(currentUser,storyData)
  */

  console.log(event);
});
