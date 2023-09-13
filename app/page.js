import Card from '@/components/Card';
import CardSM from '@/components/CardSM';


import Slider2 from '@/components/Slider2';



async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();



  return (
    <main className="min-h-[200vh] max-w-7xl mt-24 mx-auto flex flex-col justify-center px-5">

  
    <div className='w-full my-10 text-center'>
         <h1 className='text-5xl font-semibold font-limeLight'>La Voie De L&rsquo;Info</h1>
      <p className="font-normal ">Votre fenêtre sur l&rsquo;actualité</p>
    </div>


    <div className='relative flex w-full h-auto p-5'>
      
      <div className='flex-grow  max-w-[973px] mx-auto '>
        {data.slice(0,3).map((a, i) => (
        <Card key={i} article={a}/>
      ))}
      </div>
      
      <div className='sticky top-20 w-[250px] h-[700px] ml-5 hidden xl:inline'>
        {data.slice(0,5).map((a, i) => (
          <>
          <CardSM key={i} article={a} />
          <div className='w-full h-[1px] bg-slate-300 my-4'></div>
          </>
       ))}
      </div>
      
    </div>
    
    <Slider2 articles={data} />
  </main>
  )
}
