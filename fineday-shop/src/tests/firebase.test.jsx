import { auth } from "../services/firebase";

test("firebase auth should exist", () => {
  expect(auth).toBeTruthy();
});