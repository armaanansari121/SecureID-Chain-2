// /app/page.tsx
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query';
  import { gql, request } from 'graphql-request';
  import Data from '../../../components/Data';
import ManagerData from '@/components/ManagerData';
  
  // Define the GraphQL query
  const query = gql`
    {
      certificationAddeds(first: 5) {
        id
        CertificateHash
        employeeAddress
        blockNumber
      }
      employeeAddeds(first: 5) {
        id
        employeeAddress
        name
        role
        lastUpdated
        Certification
        active
      }
    }
  `;
  
  // GraphQL endpoint
  const url = 'https://api.studio.thegraph.com/query/86610/wallsecureid/version/latest';
  
  // HomePage component
  export default async function HomePage() {
    const queryClient = new QueryClient();
  
    // Prefetch data during SSR
    await queryClient.prefetchQuery({
      queryKey: ['data'],
      async queryFn() {
        return await request(url, query);
      },
    });
  
    // Dehydrate the queryClient to pass the state
    const dehydratedState = dehydrate(queryClient);
    const prefetchedData = queryClient.getQueryData(['data']); // Get the prefetched data
  
    return (
      <HydrationBoundary state={dehydratedState}>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Employee Data</h1>
          <ManagerData data={prefetchedData} />
        </div>
      </HydrationBoundary>
    );
  }
  