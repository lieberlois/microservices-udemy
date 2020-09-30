import mongoose from "mongoose";
import { Password } from "../services/password";

// Interface that describes required properties to create
// a new user.
interface UserAttributes {
  email: string;
  password: string;
}

// Interface that describes the properties of a user model.
interface UserModel extends mongoose.Model<UserDocument> {
  build(data: UserAttributes): UserDocument;
}

// Interface that describes the properties of a user document.
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (data: UserAttributes) => {
  return new User(data);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
