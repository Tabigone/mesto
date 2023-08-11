export default class User {
    constructor(api) {
      this.promise = api.getProfileInfo()
      .then((userInfo) => {
        this._id = userInfo._id
        this.name = userInfo.name 
        this.about= userInfo.about
        this.avatar = userInfo.avatar
      })
    }
}
