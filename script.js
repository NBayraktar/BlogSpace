let postsArray = []
const titleInput = document.getElementById('post-title')
const bodyInput = document.getElementById('post-body')
const form = document.getElementById('new-post')

function renderPosts() {
  let html = ''
  for (let post of postsArray) {
    html += `
      <h3>${post.title}</h3>
      <p class="blog-text">${post.body}</p>
      <hr/>
    `
  }
  document.getElementById('blog-list').innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(response => response.json())
  .then(data => {
    postsArray = data.slice(0, 4)
    renderPosts()
  })

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const postTitle = titleInput.value
  const postBody = bodyInput.value
  const data = {
    title: postTitle,
    body: postBody
  }

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(response => response.json())
    .then(post => {
      if (postTitle != '' && postBody != '') {
        postsArray.unshift(post)
        renderPosts()
      }
    })
  form.reset()
})