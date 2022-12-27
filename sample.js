const POST_TYPE = {
  politics: 'politics',
  economy: 'economy',
  violence: 'violence',
};

class Post {
  title = '';
  description = '';
  author = new Author();
  type = POST_TYPE.economy;
  publicationDate = new Date();

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
  /** @type {Post[]} */
  posts = [];

  /**
   * @param {Post[]} posts
   */
  constructor(posts = []) {
    this.posts = posts;
  }

  addPost(post = new Post()) {
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
  name = '';
  birthday = new Date();

  constructor(name = '', birthday = new Date()) {
    this.name = name;
    this.birthday = birthday;
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
