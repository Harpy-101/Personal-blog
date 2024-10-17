import { marked } from "marked"
import { blogPosts } from "./data.js"



document.addEventListener("DOMContentLoaded", () => {
  const mainEl = document.querySelector("main")
  
  function loadContentGrid() {
    const contentGrid = document.getElementById(`content-grid`)
    let posts = ""
    blogPosts.forEach(post => {
      posts += `
        <div class="post-card" data-post="${post.name}">
          <img src="${post.img}">
          <p>${post.date}</p>
          <h2>${post.name}</h2>
          <p>${post.highlight}</p>
        </div>
      `
    });

    contentGrid.innerHTML = posts
  }
  loadContentGrid()

  document.addEventListener(`click`, e => {
    const postEl = e.target.closest(`.post-card`)
    if (postEl) {
      const postId = postEl.dataset.post
      console.log(postId)
      loadPost(postId)

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    if (e.target.dataset.home) {
      console.log(e.target.dataset.home)
      loadHomePage()
    }
  })

  function loadPost(postName) {
    let postPage = ``
    for (let i = 0; i < blogPosts.length; i++) {
      if (blogPosts[i].name === postName) {
        const post = blogPosts[i]
        postPage += `
          <section>
            <div class="post">
              <p>${post.date}</p>
              <h1>${post.name}</h1>
              <p>${post.highlight}</p>
              <img src="${post.img}">
              <div>
                ${marked(post.content)}
              </div> 
            </div>
          </section>

          </section>
            <div>
              <h2 class="recent-post-text">Recent posts</h2>
              <div class="content-grid" id="content-grid"
              </div>
            </div>
          </section>
        `
      }
    }
    mainEl.innerHTML = postPage
    loadContentGrid()
  }

  function loadHomePage() {
    let homePage = `
      <section>
        <div class="hero">
          <div class="hero-text">
          <p class="date"> july 23, 2024</p>
          <h1>My new journey as a bootcamp student.</h1>
          <p>After several months of learning in the Frontend Developer Career Path, 
            I've made the big jump over to the Bootcamp to get expert code reviews of my Solo Projects projects and meet like-minded peers.</p>
            </div>
        </div>
      </section>

      <section>
        <div class="content-grid" id="content-grid">

        </div>
      </section>
    `
    mainEl.innerHTML = homePage
    loadContentGrid()
  }
})