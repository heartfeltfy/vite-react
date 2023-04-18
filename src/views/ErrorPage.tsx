import { useRouteError } from "react-router-dom";

interface ErrorResponse {
  data: any;
  status: number;
  statusText: string;
  message?: string;
}

const errorCheck = (error: any): error is ErrorResponse => {
  return "data" in error && "status" in error && "statusText" in error;
};

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (errorCheck(error)) {
    return <div className="ErrorPage">{error.statusText || error.message}</div>;
  }
  return <></>;
}
