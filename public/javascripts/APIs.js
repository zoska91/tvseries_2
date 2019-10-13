export class APIs {
  constructor() {
    this.UrlFavorites = "/profile/favorites";
    this.UrlGetSearchTitle = "http://api.tvmaze.com/search/";
    this.UrlOneId = "http://api.tvmaze.com/shows/";
  }

  async getIdsOfFavorites() {
    try {
      const resp = await fetch(this.UrlFavorites);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getSearchTitle(title) {
    try {
      const resp = await fetch(`${this.UrlGetSearchTitle}shows?q=${title}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getInfoOneId(id) {
    try {
      const resp = await fetch(`${this.UrlOneId}${id}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
