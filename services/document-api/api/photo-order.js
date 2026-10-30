/**
 * POST /api/photo-order — Start payment for a passport photo.
 *
 * Body:    { sizeId, email, fullName?, photoHash }  (photoHash = SHA-256 of the cutout PNG)
 * Returns: { reference, accessCode, amount, currency }
 */
import { postHandler } from '../lib/http.js';
import { newReference } from '../lib/order.js';
import { initializeTransaction } from '../lib/paystack.js';
import { validatePhotoOrder } from '../lib/photo.js';
import { PHOTO_PRODUCT } from '../lib/catalog.js';

export const handlePhotoOrder = async (body, deps = {}) => {
  const { size, email, hash, name, price } = validatePhotoOrder(body);
  const reference = newReference(PHOTO_PRODUCT.id);
  const init = deps.initialize || initializeTransaction;
  const { accessCode } = await init({
    email,
    amountKes: price,
    reference,
    metadata: {
      doc_type: PHOTO_PRODUCT.id,
      size_id: size.id,
      photo_hash: hash,
      custom_fields: [
        { display_name: 'Product', variable_name: 'product', value: `Passport photo (${size.name})` },
        ...(name ? [{ display_name: 'Customer', variable_name: 'customer', value: name }] : []),
      ],
    },
  });
  return { reference, accessCode, amount: price, currency: 'KES' };
};

export default postHandler(body => handlePhotoOrder(body));
