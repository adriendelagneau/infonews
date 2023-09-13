


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

  console.log(data)


  return (
    <main className="min-h-[200vh] max-w-7xl mt-24 mx-auto flex flex-col justify-center px-5 font-libreBaskerville">

    </main>
  )
}
