import {
  render
} from "@testing-library/react";

import ProtectedRoute from "../components/ProtectedRoute";

test(
  "renders protected content",
  () => {

    render(

      <ProtectedRoute user={true}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    );
  }
);
