
const API_URL = process.env.API_URL;

export type PropertySearchRequest = {
  place: string;
  city: string;
  is_apartment: boolean;
  is_house: boolean;
  is_townhouse: boolean;
  min_price: number;
  max_price: number;
  rooms: number;
  deposit_percentage: number;
  interest_rate: number;
  years: number;
};

export type PropertySearchResponse<T = any> = {
  count: number;
  properties: T[];
};

export async function searchProperties(
  request: PropertySearchRequest
): Promise<PropertySearchResponse> {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${API_URL}/properties/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
