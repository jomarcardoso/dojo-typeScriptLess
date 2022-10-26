class Author {
  constructor(name = '', bornDay) {
    this.name = name;
    this.bornDay = bornDay;
  }
}

const POST_TYPE = {
  politics: 'politics',
  economy: 'economy',
  violence: 'violence'
}

class Post {
  /**
   * @param {Author} author 
   * @param {keyof POST_TYPE} type 
   */
  constructor(title = '', description = '', imageUrl = '', author, type, publicationDate = new Date()) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.author = author;
    this.type = type;
    this.publicationDate = publicationDate;
  }
}

class Blog {
  /**
   * @param {Post[]} posts 
   */
  constructor(posts = []) {
    this.posts = posts;
  }

  /**
   * @param {Post} post
   */
  addPost(post) {
    this.posts.push(post);
  }
}

const jomarAuthor = new Author('Jomar', new Date('3/27/1991'));
const ukrainPost = new Post(
  'Atendo contra Ucrânia',
  'russia lança bombas de fragmentação sobre a população ucraniana',
  'image.png',
  jomarAuthor,
  'violence'
);
const blog = new Blog();

blog.addPost(ukrainPost);
