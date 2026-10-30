/**
 * POST /api/order — Step 1: validate details and open a Paystack payment.
 *
 * Body:    { docType, details: { fullName, email, ... } }
 * Returns: { reference, accessCode, amount, currency, name }
 *
 * The price comes from the catalog, never from the browser.
 */
import { postHandler } from '../lib/http.js';
import { validateOrder, orderHash, newReference } from '../lib/order.js';
import { initializeTransaction } from '../lib/paystack.js';

export const handleOrder = async body => {
  const { type, details } = validateOrder(body);
  const reference = newReference(type.id);
  const { accessCode } = await initializeTransaction({
    email: details.email,
    amountKes: type.price,
    reference,
    metadata: {
      doc_type: type.id,
      details_hash: orderHash(type.id, details),
      custom_fields: [
        { display_name: 'Document', variable_name: 'document', value: type.name },
        { display_name: 'Customer', variable_name: 'customer', value: details.fullName },
        { display_name: 'Phone', variable_name: 'phone', value: details.phone },
      ],
    },
  });
  return { reference, accessCode, amount: type.price, currency: 'KES', name: type.name };
};

export default postHandler(handleOrder);
