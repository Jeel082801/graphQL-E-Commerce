// import Link from 'next/link'
// import Image from 'next/image'

// import { formatCurrencyValue } from '@/utils/format-currency-value'
// import { useSettingsContext } from '@/context/settings'

// function ProductCard({ id, images, name, price, slug }) {
//   const { activeCurrency } = useSettingsContext()

//   const [primaryImage] = images

//   return (
//     <article key={id}>
//       <Link
//         href={`/products/${slug}`}
//         className="group no-underline w-full h-full flex"
//       >
//         <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
//           {primaryImage ? (
//             <Image
//               src={primaryImage.url}
//               height={primaryImage.height}
//               width={primaryImage.width}
//               alt={name}
//               title={name}
//             />
//           ) : null}

//           <div className="pt-3 md:pt-6 text-center">
//             <p className="text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
//               {name}
//             </p>
//             <p className="text-gray-400 text-sm">
//               {formatCurrencyValue({
//                 currency: activeCurrency,
//                 value: price
//               })}
//             </p>
//           </div>
//         </div>
//       </Link>
//     </article>
//   )
// }

// export default ProductCard

import Link from 'next/link'
import Image from 'next/image'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'

function ProductCard({ id, images, name, price, slug }) {
  const { activeCurrency } = useSettingsContext()
  const [primaryImage] = images

  return (
    <article
      key={id}
      className="group transform transition-all duration-500 hover:-translate-y-2"
    >
      <Link
        href={`/products/${slug}`}
        className="no-underline w-full h-full block"
      >
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer w-full overflow-hidden relative">
          {/* Image container with gradient overlay on hover */}
          <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
            {primaryImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={primaryImage.url}
                  height={primaryImage.height}
                  width={primaryImage.width}
                  alt={name}
                  title={name}
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL={primaryImage.url}
                />
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ) : null}
          </div>

          {/* Product details with floating animation */}
          <div className="p-4 relative">
            {/* Product name with gradient underline */}
            <h3 className="text-gray-800 font-semibold text-lg mb-2 relative inline-block">
              <span className="relative">
                {name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span>
            </h3>

            {/* Animated price tag */}
            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-600 font-medium relative">
                <span className="relative inline-block transform transition-all duration-500 group-hover:translate-x-2">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: price
                  })}
                </span>
              </p>

              {/* Animated arrow icon */}
              <svg
                className="w-5 h-5 text-indigo-600 transform transition-all duration-500 group-hover:translate-x-2 opacity-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
