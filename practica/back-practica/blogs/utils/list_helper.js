const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
  }

const totalLikes = (blogs) => {
    let total = 0;
    if(blogs.length > 0) {
        blogs.forEach(b => {        
           total += b.likes; 
        });
    }
    return total;
}

const favoriteBlog = (blogs) => {
    let favBlog = blogs[0];
    blogs.forEach(b => {
        if(b.likes > favBlog.likes) favBlog = b;
    });
    return favBlog;
}

const mostBlogs = (blogs) => {
    let finds = {};
    let authors = {
        author: '',
        blogs: 0
    };
    blogs.forEach((val, i) => {
        finds[val.author] = (finds[val.author] || 0) + 1;
        if(blogs.length === i + 1) {
            for (const key in finds) {
                const element = finds[key];
                if(element > authors.blogs) {
                    authors.author = key;
                    authors.blogs = element;
                }                
            }
        }
    });
    return authors;
}

const mostLikes = (blogs) => {
    finds = {};
    let authors = {
        author: '',
        likes: 0
    };
    blogs.forEach((val, i) => {        
        finds[val.author] = (finds[val.likes] || 0) + val.likes;
        if(blogs.length === i + 1) {
            for (const key in finds) {
                const element = finds[key];
                if(element > authors.likes) {
                    authors.author = key;
                    authors.likes = element;
                }                
            }
        }
    });
    return authors; 
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }