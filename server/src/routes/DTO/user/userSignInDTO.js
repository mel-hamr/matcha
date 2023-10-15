class userSignInDTO {
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
    this.fame_rating = [];
    this.verified = false;
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
      !Array.isArray(this.images) ||
      !Array.isArray(this.tags)
    )
      return { status: false, message: "empty field(s)" };
    else if (
      /[^a-z-]+/gi.test(this.last_name) == true ||
      /[^a-z-]+/gi.test(this.first_name) == true
    )
      return { status: false, message: "first_name or last_name uncorrect" };
    else if (/^(?=.{8,20}$)[a-zA-Z0-9._\-@]+$/g.test(this.username) == false)
      return { status: false, message: "username uncorrect" };
    else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?\-&]{8,20}$/gi.test(
        this.password
      ) == false
    )
      return {
        status: false,
        message:
          "Password uncorrect : Must contain at least 8 and less than 20 characters 1 upper-case 1 number 1 special char '@$!%*?&-'",
      };
    else if (
      /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi.test(this.email_address) == false
    )
      return { status: false, message: "email adresse uncorrect" };
    else if (this.gender != "male" && this.gender != "female")
      return { status: false, message: "uncorrect gender" };
    else if (
      this.sexual_preference != "male" &&
      this.sexual_preference != "female"
    )
      return { status: false, message: "uncorrect sexual preference" };
    return { status: true };
  }
}

module.exports = userSignInDTO;
