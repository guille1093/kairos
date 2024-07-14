export type Organization = {
  guid: string;
  name: string;
  description?: string;
};

type NewProduct = Omit<Organization, "guid">;

export const createProduct = async (product: NewProduct) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (response.statusText === "Conflict") {
    throw new Error("Product already exists");
  }

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();
  console.log(data);

  return data.data;
};

export const getProducts = async (): Promise<Organization[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization?offset=0&pageSize=10`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch organizations");
  }

  return data.data.results;
};

export const getProduct = async (id: string): Promise<Organization> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/${id}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  return data.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Organization>
): Promise<Organization> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};
