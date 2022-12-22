const POST_TYPE = {
  politics: 'politics',
  economy: 'economy',
  violence: 'violence',
};

class Post {
  /**
   * @param {Author} author
   * @param {keyof POST_TYPE} type
   */
  constructor(
    title = '',
    description = '',
    author,
    type = POST_TYPE.economy,
    publicationDate = new Date(),
  ) {
    this.title = title;
    this.description = description;
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

/**
 * @abstract
 */
class Admin {
  constructor() {
    if (this.constructor == Admin) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @abstract
   * @param {Blog} blog
   * @param {keyof POST_TYPE} type
   */
  toPost(blog, title = '', description = '', type = POST_TYPE.economy) {
    throw new Error('Method must be implemented.');
  }
}

class Author extends Admin {
  constructor(name = '', bornDay) {
    this.name = name;
    this.bornDay = bornDay;
  }

  /**
   * @override
   * @param {Blog} blog
   * @param {keyof POST_TYPE} type
   */
  toPost(blog, title = '', description = '', type = POST_TYPE.economy) {
    const post = new Post(title, description, this, type);

    blog.addPost(post);
  }
}

const jomarAuthor = new Author('Jomar', new Date('3/27/1991'));
const blog = new Blog();

jomarAuthor.toPost(
  blog,
  'Atentado contra Ucrânia',
  'Russia lança bombas de fragmentação sobre a população ucraniana.',
  'violence',
);
