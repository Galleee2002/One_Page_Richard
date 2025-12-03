import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

export function createQueryClient(): QueryClient {
  const queryCache = new QueryCache({
    onError: (error) => {
      // Manejo global de errores para queries
      console.error("Query error:", error);
      // Aquí podrías integrar un sistema de notificaciones
    },
  });

  const mutationCache = new MutationCache({
    onError: (error) => {
      // Manejo global de errores para mutations
      console.error("Mutation error:", error);
      // Aquí podrías integrar un sistema de notificaciones
    },
  });

  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        gcTime: 5 * 60 * 1000, // 5 minutos (anteriormente cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
