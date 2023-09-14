'use client'

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import debounce from '@/utils/debonce';
import Card from '@/components/Card';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const inputValue = searchParams.get('title');
  const [searchQuery, setSearchQuery] = useState(inputValue)
  const router = useRouter();

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  // Create a dynamic key that changes when searchParams change
  const key = inputValue ? `/api/articles/search?title=${inputValue}` : null;
  const { data: articles, error } = useSWR(key, fetcher);


  useEffect(() => {

    router.push(`/search?title=${searchQuery}`);
  }, [searchQuery])


  const debouncedSetSearchQuery = debounce((value) => {
    router.push(`/search?title=${value}`);
  }, 500);



  return (
    <main className="min-h-[100vh] max-w-7xl mt-24 mx-auto flex flex-col  px-5 font-libreBaskerville">
      <div className="relative my-3">
        <label htmlFor="searchInput"></label>
        <input
          onChange={(e) => {
            const newValue = e.target.value;
            setSearchQuery(newValue); // Update the state immediately
            debouncedSetSearchQuery(newValue); // Debounced update of the URL
          }}
          placeholder="Search"
          value={searchQuery}
          className="w-full py-2 pl-1 pr-8 ml-3 border border-gray-400 max-w-[973px]"
          id="searchInput"
        />

        
        
        <div className='flex w-full mt-8'>

          <div className='relative flex w-full h-auto p-5'>
        
            <div className='flex-grow  max-w-[973px] mx-auto '>
              {error && <div>Error loading data</div>}
              {(articles?.length === 0 || !inputValue) && <div>No results</div>}

              {inputValue && !error && articles?.map((a,i) => (
                <div  key={i}>
                  <Card article={a} />
             
                </div>
              ))}
            </div>
            
            <div className='sticky top-20 w-[250px] h-[800px] ml-5 hidden xl:inline bg-green-500'>
            </div>
            
          </div>


        </div>







      </div>
    </main>
  );
};

export default SearchPage;
