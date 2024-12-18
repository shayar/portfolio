document.addEventListener('DOMContentLoaded', () => {
  const blogContainer = document.getElementById('blog-posts');
  const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=YOUR_MEDIUM_FEED_URL';

  fetch(rssUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.items) {
        data.items.slice(0, 6).forEach(item => {
          const postDiv = document.createElement('div');
          postDiv.className = 'blog-post';
          postDiv.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0,100)}...</p>
          `;
          blogContainer.appendChild(postDiv);
        });
      }
    })
    .catch(err => {
      console.error('Error fetching Medium feed:', err);
      blogContainer.innerHTML = '<p>Unable to load blog posts at this time.</p>';
    });
});
