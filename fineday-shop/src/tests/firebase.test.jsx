import { auth } from "../services/firebase";

test(
  "firebase authentication exists",
  () => {
    expect(auth).toBeTruthy();
  }
);