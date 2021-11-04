import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import mockedAxios from "axios";

jest.mock("axios", () => ({
  post: jest.fn((_url, _body) => {
    return Promise.resolve();
  }),
  get: jest.fn((_url) => {
    return Promise.resolve();
  }),
}));

test("renders app", () => {
  let { getByTestId } = render(<App />);
  expect(getByTestId("h1-logo-id").textContent).toBe("OCBC");
});

test("Login component --> Trigger submit button --> Failure", () => {
  let { getByTestId } = render(<App />);
  const input1 = getByTestId("Login-username");
  const input2 = getByTestId("Login-password");

  fireEvent.input(input1, {
    target: { value: "OCBC1" },
  });

  fireEvent.input(input2, {
    target: { value: "1234561" },
  });

  const errorMessage = "Error";
  mockedAxios.post.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage))
  );

  fireEvent.click(getByTestId("Login-submit"));

  expect(mockedAxios.post).toHaveBeenCalledTimes(1);
});

test("Login component --> Trigger submit button --> Success", () => {
  let { getByTestId } = render(<App />);
  const input1 = getByTestId("Login-username");
  const input2 = getByTestId("Login-password");

  fireEvent.input(input1, {
    target: { value: "OCBC" },
  });

  fireEvent.input(input2, {
    target: { value: "123456" },
  });

  mockedAxios.post.mockResolvedValueOnce({
    data: {
      status: "success",
      token: "token",
    },
  });

  fireEvent.click(getByTestId("Login-submit"));

  expect(mockedAxios.post).toHaveBeenCalledTimes(2);
});

test("Dashboard component --> Rendering", () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      status: "success",
      data: [
        {
          id: "39222a3e-3890-4091-8807-d92707355f8c",
          type: "receive",
          amount: 18.5,
          currency: "SGD",
          from: { accountNo: "1234-000-1234", accountHolderName: "Max Yee" },
          description: null,
          date: "2021-09-12T02:13:03.054Z",
        },
      ],
    },
  });

  let { getByTestId } = render(<App />);

  expect(getByTestId('dashboard-logoutbtn').textContent).toBe('Log out');
});

test("Dashboard component --> api error", () => {
  const errorMessage = "Error";
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage))
  );

  render(<App />);

  expect(mockedAxios.get).toHaveBeenCalled();
});

test("Dashboard component --> Trigger logout btn", () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      status: "success",
      data: [
        {
          id: "39222a3e-3890-4091-8807-d92707355f8c",
          type: "receive",
          amount: 18.5,
          currency: "SGD",
          from: { accountNo: "1234-000-1234", accountHolderName: "Max Yee" },
          description: null,
          date: "2021-09-12T02:13:03.054Z",
        },
      ],
    },
  });

  let { getByTestId } = render(<App />);
  fireEvent.click(getByTestId('dashboard-logoutbtn'));
});