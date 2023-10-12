class userSignInWO {
  constructor(body) {
    this.email_address = body.email;
    this.last_name = body.last_name;
    this.first_name = body.first_name;
    this.username = body.username;
    this.password = body.password;
    this.gender = body.gender;
    this.sexual_preference = body.sexual_preferences;
    this.biography = body.biography;
    this.images = body.images;
    this.tags = body.tags;
  }

  checkAllFields() {
    if (
      !this.email_address ||
      !this.last_name ||
      !this.first_name ||
      !this.username ||
      !this.password ||
      !this.gender ||
      !this.sexual_preference ||
      !this.biography ||
      !this.images ||
      !this.tags
    )
      return { status: false, message: "missing fields" };
    else if (
      this.email_address == "" ||
      this.last_name == "" ||
      this.first_name == "" ||
      this.username == "" ||
      this.password == "" ||
      this.gender == "" ||
      this.sexual_preference == "" ||
      this.biography == "" ||
      this.images == "" ||
      this.tags == ""
    )
      return { status: false, message: "empty field(s)" };
    if (/[^a-z-]+/gi.test(this.last_name) == true || /[^a-z-]+/gi.test(this.first_name) == true)
      return { status: false, message: "first_name or last_name uncorrect" };
      if (/[\W]+/gi.test(this.username) == true)
      return { status: false, message: "username uncorrect" };

    return { status: true };
  }
}

module.exports = userSignInWO;
