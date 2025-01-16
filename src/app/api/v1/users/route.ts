import { HttpResponse } from "@/hooks/http/useHttp";
import { NextResponse } from "next/server";

export interface UsersResponse {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
}

export interface Geo {
  lat?: string;
  lng?: string;
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export async function GET(): Promise<NextResponse<HttpResponse<UsersResponse[]>>> {
  const result: UsersResponse[] = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();

  return NextResponse.json({ data: result, message: "Success Get Users", statusCode: 200 }, { status: 200 });
}
