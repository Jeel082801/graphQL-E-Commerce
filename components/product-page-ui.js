import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'
import { motion } from 'framer-motion'

import Button from '@/ui/button'
import { ChevronDownSmallIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import ProductReviews from '@/components/product-reviews'
import { useSettingsContext } from '@/context/settings'

function ProductPageUI({ product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [variantQuantity, setVariantQuantity] = React.useState(1)
  const [activeVariantId, setActiveVariantId] = React.useState(
    router.query.variantId || product.variants[0].id
  )

  React.useEffect(() => {
    const url = `/products/${product?.slug}?variant=${activeVariantId}`
    router.replace(url, url, { shallow: true })
  }, [activeVariantId])

  const activeVariant = product.variants.find(
    (variant) => variant.id === activeVariantId
  )
  const updateQuantity = (event) =>
    setVariantQuantity(Number(event.target.value))
  const updateVariant = (event) => setActiveVariantId(event.target.value)

  const [primaryImage] = product.images

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...product.localizations.find(
            (localization) => localization.locale === locale
          )
        }
      }),
      {}
    )

    addItem(
      {
        id: activeVariantId,
        productId: product.id,
        image: product.images[0],
        price: product.price,
        ...itemMetadata
      },
      variantQuantity
    )
  }

  return (
    <motion.div
      className="lg:flex -mx-6 space-y-8 lg:space-y-0 lg:space-x-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image Section */}
      <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
        <motion.div
          className="w-full overflow-hidden relative bg-gray-200 rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={primaryImage.url}
            height={primaryImage.height}
            width={primaryImage.width}
            alt={product.name}
            title={product.name}
            className="rounded-lg"
          />
        </motion.div>
      </div>

      {/* Product Details */}
      <div className="px-6 md:py-3 lg:w-1/2 space-y-6">
        <motion.h1
          className="font-bold text-3xl md:text-5xl text-primary leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {product.name}
        </motion.h1>

        <motion.div
          className="text-2xl font-semibold text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {formatCurrencyValue({
            currency: activeCurrency,
            value: product.price
          })}
        </motion.div>

        <motion.p
          className="leading-loose text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.description}
        </motion.p>

        {/* Variant & Quantity Selection */}
        <div className="md:flex md:flex-wrap -mx-3 space-y-6 md:space-y-0">
          {product.variants.length > 1 && (
            <motion.div
              className="md:w-3/4 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold tracking-widest uppercase text-gray-600 mb-2">
                Style
              </label>
              <div className="relative">
                <select
                  id="style"
                  name="style"
                  value={activeVariantId}
                  className="w-full bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-primary px-4 py-3 rounded-lg"
                  style={{ letterSpacing: '1px' }}
                  onChange={updateVariant}
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <ChevronDownSmallIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="md:w-1/4 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-bold tracking-widest uppercase text-gray-600 mb-2">
              Quantity
            </label>
            <div className="relative">
              <select
                id="quantity"
                name="quantity"
                value={variantQuantity}
                className="w-full bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-primary px-4 py-3 rounded-lg"
                onChange={updateQuantity}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <ChevronDownSmallIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add to Cart Button */}
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={addToCart}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition-all"
            style={{ color: 'black', widtg: 'auto', letterSpacing: '1px' }}
          >
            Add to Cart
          </Button>
        </motion.div>

        {/* Product Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ProductReviews product={product} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductPageUI
