import bcrypt from "bcryptjs";

// ENCRYPT/HASH THE PASSWORD FUNCTION
export async function hashPassword(password) {
  // salt is a random value that is added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// COMPARE ENCRYPTED/HASHED PASSWORDS DURING LOGIN, LOGIN PASSWORD TO DB PASSWORD
export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}