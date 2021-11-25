import mongoose from 'mongoose';
import { PasswordService } from '../services/password';

/**
 * Interface that describe props needed to create a new user.
 */
export interface UserAttrs {
  email: string;
  password: string;
}

/**
 * Interface that describes props that a user model has.
 * Used to provide types to TS to allow for functions on mongoose's statics object
 */
export interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * Interface that describes props that a user document has.
 * Retrieved from mongodb. This will contain the additional props added by mongodb.
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  //   createdAt: string;
  //   updatedAt: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  // "this" context here is the user doc. Cannot use arrow fn here.
  if (this.isModified('password')) {
    const hashed = await PasswordService.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
