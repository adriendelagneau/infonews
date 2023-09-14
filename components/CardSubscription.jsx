import React from 'react'

const CardSubscription = ({ color, title, price, pricePerMonth }) => {
    console.log(color);
  return (
      <div className=''>
          <div className={`${color} rounded-xl w-[360px] ml-10 `}>
    <div className="flex flex-col p-8 translate-x-4 translate-y-4 bg-white shadow-xl rounded-xl w-96 md:w-auto">
        <div className="mt-3 mb-5 text-2xl font-semibold capitalize">{title}</div>
        <div className="text-sm font-light w-60 md:w-auto">Unlimited access to all contents</div>
        <div className="my-4">
                
                  <span className="font-light text-slg">{ pricePerMonth}$ /month</span>
        </div>

        <button className="bg-[#2e46bd] px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4">
            Pay {price} $
        </button>
    </div>
</div></div>
  )
}

export default CardSubscription