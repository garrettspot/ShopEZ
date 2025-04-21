import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Mock API implementation
  const mockResponse = async () => {
    if (url === '/api/products') {
      return { json: () => mockProducts };
    }
    
    if (url.startsWith('/api/products/')) {
      const id = Number(url.split('/').pop());
      const product = mockProducts.find(p => p.id === id);
      return { json: () => product };
    }
    
    if (url === '/api/cart') {
      if (method === 'GET') {
        return { json: () => Array.from(mockCartItems.values()) };
      }
      if (method === 'POST') {
        const { productId } = data as { productId: number };
        const product = mockProducts.find(p => p.id === productId);
        const cartItem = { id: Date.now(), productId, quantity: 1, product };
        mockCartItems.set(productId, cartItem);
        return { json: () => cartItem };
      }
    }
    
    if (url.startsWith('/api/cart/')) {
      const productId = Number(url.split('/').pop());
      if (method === 'DELETE') {
        mockCartItems.delete(productId);
        return { status: 204 };
      }
      if (method === 'PATCH') {
        const { quantity } = data as { quantity: number };
        const item = mockCartItems.get(productId);
        if (item) {
          item.quantity = quantity;
          return { json: () => item };
        }
      }
    }
    
    if (url === '/api/wishlist') {
      if (method === 'GET') {
        return { json: () => Array.from(mockWishlistItems.values()) };
      }
      if (method === 'POST') {
        const { productId } = data as { productId: number };
        const product = mockProducts.find(p => p.id === productId);
        const wishlistItem = { id: Date.now(), productId, product };
        mockWishlistItems.set(productId, wishlistItem);
        return { json: () => wishlistItem };
      }
    }
    
    if (url.startsWith('/api/wishlist/')) {
      const productId = Number(url.split('/').pop());
      if (method === 'DELETE') {
        mockWishlistItems.delete(productId);
        return { status: 204 };
      }
    }
    
    return new Response(null, { status: 404 });
  };

  const res = await mockResponse();
  if (res instanceof Response) {
    await throwIfResNotOk(res);
  }
  return res as Response;
}

export const getQueryFn: <T>(options: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await apiRequest('GET', queryKey[0] as string);
    return res.json();

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
